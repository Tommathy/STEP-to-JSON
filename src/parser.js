const Subject = require('rxjs').Subject;
const { v4: uuidv4 } = require('uuid');
const { fixSpecialChars } = require('./utils.js');
const { AttributeParser } = require("./AttributeParser.js")

/**
 * @typedef {"PRODUCT_DEFINITION"|"NEXT_ASSEMBLY_USAGE_OCCURRENCE"} Entities
 */

/**
 * @typedef {Object} ParserOptions
 * @property {String} force force parse file, allows first line to be different than "ISO-10303-21"
 */

/**
 * @typedef {Object} StpHeader
 * @property {String} fileName name of this exchange structure- There is no strict rule how to use this field
 * @property {String} fileSchema Specifies one or several Express schema governing the information in the data section(s)
 * @property {String} fileDescription A brief description of the contents of the file.
 */

/**
 * @typedef {Object} PreprocessedData
 * @property {String} productDefinitions
 * @property {String} nextAssemblyUsageOccurences
 */

/**
 * @typedef {Object} PreprocessedFile
 * @property {StpHeader} header pre processed header section lines
 * @property {Object.<string, Entities>} data  pre processed data section lines
 */

class StepToJsonParser {
    /**
     * @param {String} file
     * @param {ParserOptions} parserOptions
     */
    constructor(file, parserOptions = {}) {
        this.forceParse = parserOptions.force ?? false;
        this.file = file;
        this.preprocessedFile = {
            header: {
                fileDescription: '',
                fileName: '',
                fileSchema: ''
            },
            data: {}
        };

        this.preprocessFile();
    }

    /**
     * Parses a STEP file and outputs its contents as a JSON tree
     *
     * @param {function} visitorFunction A function that will be executed for every product occurrence of the assembly
     * @param {Subject} sub A subject that can be used to track progress
     */
    parse(visitorFunction = undefined, sub = new Subject()) {
        this.parseProductDefinitions(this.preprocessedFile.data.PRODUCT_DEFINITION);
        this.parseNextAssemblyUsageOccurences(
            this.preprocessedFile.data.NEXT_ASSEMBLY_USAGE_OCCURRENCE
        );
        const rootAssembly = this.identifyRootAssembly();
        const result = this.buildStructureObject(rootAssembly, sub, visitorFunction);
        return result;
    }

    /**
     * Parses a STEP file and outputs its contents as a JSON tree. Adds a UUID for every product occurrence
     * @param {*} sub A subject that can be used to track progress
     */
    parseWithUuid(sub = new Subject()) {
        return this.parse(StepToJsonParser.uuidVisitor, sub);
    }

    /**
     * Splits the STEP-file into single lines and stores all lines that contain product definitions and assembly relations
     *
     * @returns {preprocessedFile} preprocessed data representation of the stepfile
     */
    preprocessFile() {
        /**
         * Construct a generic error message for the current preprocess action
         * @param {String} message
         * @returns {Error}
         */
        function createErrorMessage(message) {
            return `Line: ${lineCount} | ${message}`;
        }

        let lineCount = 1;
        let activeSections = [];
        let lines;
        try {
            lines = this.file.toString().split(/;[\r\n]+/gm);
        } catch (error) {
            throw new Error(createErrorMessage(`Error while parsing step file`), error);
        }

        const filePrefix = lines.shift();
        // this parser is only tested with ISO-10303-21 files
        if (!(filePrefix == 'ISO-10303-21' || this.forceParse))
            throw new Error(
                createErrorMessage(
                    'Unsupported step file provided. First line does not match ISO-10303-21'
                )
            );

        this.filePrefix = filePrefix;

        for (const line of lines) {
            lineCount += 1;

            // Keep track of sections
            if (['HEADER', 'DATA'].includes(line)) {
                activeSections.push(line);
                continue;
            }

            if (line == 'ENDSEC') {
                activeSections.pop(line);
                continue;
            }

            if (line == 'END-ISO-10303-21') {
                break; // File end detected, exit processor loop
            }

            // We are currently not in a section, skip
            if (activeSections.length == 0) continue;
            let currentSection = activeSections[activeSections.length - 1];

            if (currentSection == 'HEADER') {
                if (line.includes('FILE_NAME')) {
                    this.preprocessedFile.header.fileName = line;
                    continue;
                }

                if (line.includes('FILE_SCHEMA')) {
                    this.preprocessedFile.header.fileSchema = line;
                    continue;
                }

                if (line.includes('FILE_DESCRIPTION')) {
                    this.preprocessedFile.header.fileDescription = line;
                    continue;
                }
            } else if (currentSection == 'DATA') {
                // TODO: Check if something else is here more efficient
                // Replace new line followed by whitespace & match basic parameters
                const [, instanceName, entity, parameters] = line.replaceAll(/[\r\n]*\s+/g, "").match(
                    /^#([0-9]*)[= ]*([A-Z_]*)([^]*)$/
                );

                if (!this.preprocessedFile.data[entity]) {
                    this.preprocessedFile.data[entity] = new Map();
                }
                this.preprocessedFile.data[entity].set(instanceName, parameters);
            }
        }

        return this.preprocessedFile;
    }

    /**
     * Parses the lines of the next assembly usage occurrence and extracts id of relation, container id, contained id and contained name
     *
     * @param {Array<string>} nextAssemblyUsageOccurences
     * @param {Subject} subject Subject that can be used to track this function's state
     * @returns
     */
    parseNextAssemblyUsageOccurences(nextAssemblyUsageOccurences, subject = new Subject()) {
        let progress = 1;
        const assemblyRelations = [];
        nextAssemblyUsageOccurences.forEach((rawAttributes, id) => {
            subject.next(progress++);

            const newId = id
            const attributes = StepToJsonParser.getAttributes(rawAttributes);


            const container = attributes[0].getContains()[3].getValue();
            const contained = attributes[0].getContains()[4].getValue();

            const assemblyObject = {
                id: newId,
                container: container,
                contains: contained
            };
            assemblyRelations.push(assemblyObject);
        });

        subject.complete();

        this.relations = assemblyRelations;
        return assemblyRelations;
    }

    /**
     * Parses the lines of the product definition and extracts id and name
     *
     * @param {Array<string>} productDefinitionLines
     * @param {Subject} subject Subject that can be used to track this function's state
     * @returns
     */
    parseProductDefinitions(productDefinitionLines, subject = new Subject()) {
        let progress = 1;
        const products = [];

        productDefinitionLines.forEach((rawAttributes, id) => {
            subject.next(progress++);

            const attributes = StepToJsonParser.getAttributes(rawAttributes);

            const newId = id;
            const name = attributes[0].getContains()[0].getValue();

            const productObject = {
                id: newId,
                name: fixSpecialChars(name)
            };
            products.push(productObject);
        });
        subject.complete();
        this.products = products;
        return products;
    }

    /**
     * Identifies the root component that contains all other components
     */
    identifyRootAssembly() {
        if (this.products.length === 1) {
            return this.products[0];
        }

        try {
            let rootComponent;
            this.products.forEach((product) => {
                // Look for a relation where product is the container
                const productIsContainer = this.relations.some(
                    (relation) => relation.container === product.id
                );

                // Look for a relation where product is contained
                const productIsContained = this.relations.some(
                    (relation) => relation.contains === product.id
                );

                // Root assembly acts a container, but is not contained in any other product
                if (productIsContainer && !productIsContained) {
                    rootComponent = product;
                }
            });

            return rootComponent;
        } catch (error) {
            throw new Error('Root component could not be found');
        }
    }

    /**
     * Returns the preprocessed file
     */
    getPreProcessedObject() {
        return this.preprocessedFile;
    }

    /**
     * Returns a containment structure object for a given product object that has id and name
     * @param {*} rootProduct The root component of the assembly
     * @param {*} buildSubject An instance of rxjs Subject that can be used to track this function's progress
     * @param {*} visitorFunction A function that is executed for every component. Can be used to customize processing or add additional data
     */
    buildStructureObject(rootProduct, buildSubject = new Subject(), visitorFunction = undefined) {
        let relationsChecked = 0;
        const structureObject = {
            id: rootProduct.id,
            name: rootProduct.name,
            contains: []
        };

        if (visitorFunction !== undefined) {
            const visitorResult = visitorFunction(structureObject);
            structureObject[visitorResult.key] = visitorResult.value;
        }

        this.relations.forEach((relation) => {
            buildSubject.next(++relationsChecked);
            if (relation.container === rootProduct.id) {
                const containedProduct = this.getContainedProduct(relation.contains);
                structureObject.contains.push(
                    this.buildStructureObject(containedProduct, buildSubject, visitorFunction)
                );
            }
        });

        if (visitorFunction !== undefined) {
            const visitorResult = visitorFunction(structureObject);
            structureObject[visitorResult.key] = visitorResult.value;
        }

        buildSubject.complete();
        return structureObject;
    }

    /**
     * Checks if a productId serves as a container for other products
     *
     * @param {*} productId
     * @returns
     */
    isContainer(productId) {
        const isContainer = this.relations.some((element) => element.container === productId);
        return isContainer;
    }

    /**
     * Get the contained product of a relation given a relation's 'contained-id'
     *
     * @param {string} relationContainsId 'contains-id' of the relation
     */
    getContainedProduct(relationContainsId) {
        return this.products.find((product) => product.id === relationContainsId);
    }

    /**
     * Returns the name for a given product id
     *
     * @param {string} productId ID of the product
     * @returns {string} Name of the product
     */
    getProductName(productId) {
        let productName = '';
        this.products.forEach((element) => {
            if (element.id === productId) {
                productName = element.name;
            }
        });
        return productName;
    }

    /**
     * Returns attributes of a line that are defined inside parantheses
     *
     * @param {String} attributesString a string that holds all attributes e.g.: "('',#101,POSITIVE_LENGTH_MEASURE(2.E-2),#95)"
     * @returns {Array<string>} An array of attributes
     */
    static getAttributes(attributesString) {
        return new AttributeParser(attributesString).parse() // new Attribute Parser implementation
    }

    /**
     * An exemplary visitor function that creates a UUID
     */
    static uuidVisitor() {
        const id = uuidv4();
        const result = {
            key: 'uuid',
            value: id
        };
        return result;
    }
}

exports.StepToJsonParser = StepToJsonParser;
