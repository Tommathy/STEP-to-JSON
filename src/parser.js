import { AdvancedBrepShapeRepresentation } from './entities/AdvancedBrepShapeRepresentation.js';
import { AdvancedFace } from './entities/AdvancedFace.js';
import { ApplicationContext } from './entities/ApplicationContext.js';
import { AttributeParser } from './AttributeParser.js';
import { Axis2Placement2d } from './entities/Axis2Placement2d.js';
import { Axis2Placement3d } from './entities/Axis2Placement3d.js';
import { BSplineCurveWithKnots } from './entities/BSplineCurveWithKnots.js';
import { BSplineSurfaceWithKnots } from './entities/BSplineSurfaceWithKnots.js';
import { CartesianPoint } from './entities/CartesianPoint.js';
import { Circle } from './entities/Circle.js';
import { ClosedShell } from './entities/ClosedShell.js';
import { ColourRGB } from './entities/ColourRGB.js';
import { ConicalSurface } from './entities/ConicalSurface.js';
import { ContextDependentShapeRepresentation } from './entities/ContextDependentShapeRepresentation.js';
import { CurveStyle } from './entities/CurveStyle.js';
import { CylindricalSurface } from './entities/CylindricalSurface.js';
import { DefinitionalRepresentation } from './entities/DefinitionalRepresentation.js';
import { DescriptiveRepresentationItem } from './entities/DescriptiveRepresentationItem.js';
import { Direction } from './entities/Direction.js';
import { DraughtingPreDefinedColour } from './entities/DraughtingPreDefinedColour.js';
import { DraughtingPreDefinedCurveFont } from './entities/DraughtingPreDefinedCurveFont.js';
import { EdgeCurve } from './entities/EdgeCurve.js';
import { EdgeLoop } from './entities/EdgeLoop.js';
import { Ellipse } from './entities/Ellipse.js';
import { FaceBound } from './entities/FaceBound.js';
import { FillAreaStyle } from './entities/FillAreaStyle.js';
import { FillAreaStyleColour } from './entities/FillAreaStyleColour.js';
import { GeometricCurveSet } from './entities/GeometricCurveSet.js';
import { ItemDefinedTransformation } from './entities/ItemDefinedTransformation.js';
import { Line } from './entities/Line.js';
import { ManifoldSolidBrep } from './entities/ManifoldSolidBrep.js';
import { MechanicalDesignGeometricPresentationRepresentation } from './entities/MechanicalDesignGeometricPresentationRepresentation.js';
import { NextAssemblyUsageOccurrence } from './entities/NextAssemblyUsageOccurrence.js';
import { OpenShell } from './entities/OpenShell.js';
import { OrientedEdge } from './entities/OrientedEdge.js';
import { OverRidingStyledItem } from './entities/OverRidingStyledItem.js';
import { Pcurve } from './entities/Pcurve.js';
import { Plane } from './entities/Plane.js';
import { PresentationLayerAssignment } from './entities/PresentationLayerAssignment.js';
import { PresentationStyleAssignment } from './entities/PresentationStyleAssignment.js';
import { Product } from './entities/Product.js';
import { ProductContext } from './entities/ProductContext.js';
import { ProductDefinition } from './entities/ProductDefinition.js';
import { ProductDefinitionContext } from './entities/ProductDefinitionContext.js';
import { ProductDefinitionFormation } from './entities/ProductDefinitionFormation.js';
import { ProductDefinitionShape } from './entities/ProductDefinitionShape.js';
import { ProductRelatedProductCategory } from './entities/ProductRelatedProductCategory.js';
import { PropertyDefinition } from './entities/PropertyDefinition.js';
import { PropertyDefinitionRepresentation } from './entities/PropertyDefinitionRepresentation.js';
import { Representation } from './entities/Representation.js';
import { SeamCurve } from './entities/SeamCurve.js';
import { ShapeDefinitionRepresentation } from './entities/ShapeDefinitionRepresentation.js';
import { ShapeRepresentation } from './entities/ShapeRepresentation.js';
import { ShellBasedSurfaceModel } from './entities/ShellBasedSurfaceModel.js';
import { SphericalSurface } from './entities/SphericalSurface.js';
import { StyledItem } from './entities/StyledItem.js';
import { Subject } from 'rxjs';
import { SurfaceCurve } from './entities/SurfaceCurve.js';
import { SurfaceOfLinearExtrusion } from './entities/SurfaceOfLinearExtrusion.js';
import { SurfaceSideStyle } from './entities/SurfaceSideStyle.js';
import { SurfaceStyleFillArea } from './entities/SurfaceStyleFillArea.js';
import { SurfaceStyleUsage } from './entities/SurfaceStyleUsage.js';
import { ToroidalSurface } from './entities/ToroidalSurface.js';
import { TrimmedCurve } from './entities/TrimmedCurve.js';
import { UncertaintyMeasureWithUnit } from './entities/UncertaintyMeasureWithUnit.js';
import { Vector } from './entities/Vector.js';
import { VertexLoop } from './entities/VertexLoop.js';
import { VertexPoint } from './entities/VertexPoint.js';
import { fixSpecialChars } from './utils.js';

/**
 * @typedef {"PRODUCT_DEFINITION"|"NEXT_ASSEMBLY_USAGE_OCCURRENCE"|"COLOUR_RGB"} Entities
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
    entities = {
        ADVANCED_BREP_SHAPE_REPRESENTATION: AdvancedBrepShapeRepresentation,
        ADVANCED_FACE: AdvancedFace,
        APPLICATION_CONTEXT: ApplicationContext,
        AXIS2_PLACEMENT_2D: Axis2Placement2d,
        AXIS2_PLACEMENT_3D: Axis2Placement3d,
        B_SPLINE_CURVE_WITH_KNOTS: BSplineCurveWithKnots,
        B_SPLINE_SURFACE_WITH_KNOTS: BSplineSurfaceWithKnots,
        CARTESIAN_POINT: CartesianPoint,
        CIRCLE: Circle,
        CLOSED_SHELL: ClosedShell,
        COLOUR_RGB: ColourRGB,
        CONICAL_SURFACE: ConicalSurface,
        CONTEXT_DEPENDENT_SHAPE_REPRESENTATION: ContextDependentShapeRepresentation,
        CURVE_STYLE: CurveStyle,
        CYLINDRICAL_SURFACE: CylindricalSurface,
        DEFINITIONAL_REPRESENTATION: DefinitionalRepresentation,
        DESCRIPTIVE_REPRESENTATION_ITEM: DescriptiveRepresentationItem,
        DIRECTION: Direction,
        DRAUGHTING_PRE_DEFINED_COLOUR: DraughtingPreDefinedColour,
        DRAUGHTING_PRE_DEFINED_CURVE_FONT: DraughtingPreDefinedCurveFont,
        EDGE_CURVE: EdgeCurve,
        EDGE_LOOP: EdgeLoop,
        ELLIPSE: Ellipse,
        FACE_BOUND: FaceBound,
        FILL_AREA_STYLE_COLOUR: FillAreaStyleColour,
        FILL_AREA_STYLE: FillAreaStyle,
        GEOMETRIC_CURVE_SET: GeometricCurveSet,
        ITEM_DEFINED_TRANSFORMATION: ItemDefinedTransformation,
        LINE: Line,
        MANIFOLD_SOLID_BREP: ManifoldSolidBrep,
        MECHANICAL_DESIGN_GEOMETRIC_PRESENTATION_REPRESENTATION:
            MechanicalDesignGeometricPresentationRepresentation,
        NEXT_ASSEMBLY_USAGE_OCCURRENCE: NextAssemblyUsageOccurrence,
        OPEN_SHELL: OpenShell,
        ORIENTED_EDGE: OrientedEdge,
        OVER_RIDING_STYLED_ITEM: OverRidingStyledItem,
        PCURVE: Pcurve,
        PLANE: Plane,
        PRESENTATION_LAYER_ASSIGNMENT: PresentationLayerAssignment,
        PRESENTATION_STYLE_ASSIGNMENT: PresentationStyleAssignment,
        PRODUCT_CONTEXT: ProductContext,
        PRODUCT_DEFINITION_CONTEXT: ProductDefinitionContext,
        PRODUCT_DEFINITION_FORMATION: ProductDefinitionFormation,
        PRODUCT_DEFINITION_SHAPE: ProductDefinitionShape,
        PRODUCT_DEFINITION: ProductDefinition,
        PRODUCT_RELATED_PRODUCT_CATEGORY: ProductRelatedProductCategory,
        PRODUCT: Product,
        PROPERTY_DEFINITION_REPRESENTATION: PropertyDefinitionRepresentation,
        PROPERTY_DEFINITION: PropertyDefinition,
        REPRESENTATION: Representation,
        SEAM_CURVE: SeamCurve,
        SHAPE_DEFINITION_REPRESENTATION: ShapeDefinitionRepresentation,
        SHAPE_REPRESENTATION: ShapeRepresentation,
        SHELL_BASED_SURFACE_MODEL: ShellBasedSurfaceModel,
        SPHERICAL_SURFACE: SphericalSurface,
        STYLED_ITEM: StyledItem,
        SURFACE_CURVE: SurfaceCurve,
        SURFACE_OF_LINEAR_EXTRUSION: SurfaceOfLinearExtrusion,
        SURFACE_SIDE_STYLE: SurfaceSideStyle,
        SURFACE_STYLE_FILL_AREA: SurfaceStyleFillArea,
        SURFACE_STYLE_USAGE: SurfaceStyleUsage,
        TOROIDAL_SURFACE: ToroidalSurface,
        TRIMMED_CURVE: TrimmedCurve,
        UNCERTAINTY_MEASURE_WITH_UNIT: UncertaintyMeasureWithUnit,
        VECTOR: Vector,
        VERTEX_LOOP: VertexLoop,
        VERTEX_POINT: VertexPoint
    };

    /**
     * @param {String} file
     * @param {ParserOptions} parserOptions
     */
    constructor(file, parserOptions = {}) {
        this.printStatus = false;
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
            lines = this.file.split(/;[\r\n]+/gm);
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
                const [, instanceName, entity, parameters] = line.match(
                    /^#([0-9]*)[= ]*([A-Z_0-9]*)([^]*)$/
                );

                if (!this.preprocessedFile.data[entity]) {
                    this.preprocessedFile.data[entity] = new Map();
                }

                if (this.printStatus && lineCount % 10000 == 0) {
                    const memoryUsage = process.memoryUsage();
                    const cpuUsage = process.cpuUsage();

                    console.log(`\n${lineCount}/${lines.length}`);
                    console.log('\nMemory Usage:');
                    console.log(
                        `- RSS (Resident Set Size): ${Math.round(memoryUsage.rss / (1024 * 1024))} MB`
                    );
                    console.log(
                        `- Heap Total: ${Math.round(memoryUsage.heapTotal / (1024 * 1024))} MB`
                    );
                    console.log(
                        `- Heap Used: ${Math.round(memoryUsage.heapUsed / (1024 * 1024))} MB`
                    );
                    console.log(
                        `- External: ${Math.round(memoryUsage.external / (1024 * 1024))} MB`
                    );

                    console.log('\nCPU Usage:');
                    console.log(`- User CPU Time: ${cpuUsage.user / 1000} ms`);
                    console.log(`- System CPU Time: ${cpuUsage.system / 1000} ms`);
                }

                const targetEntity = this.entities[entity];
                if (targetEntity) {
                    this.preprocessedFile.data[entity].set(
                        instanceName,
                        new targetEntity(parameters)
                    );
                } else {
                    if (this.printStatus) console.log(`Not Implemented entity: ${entity}`);
                }
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
        nextAssemblyUsageOccurences.forEach((entity, id) => {
            subject.next(progress++);
            const newId = id;

            const container = entity.getRelatingProductDefinition();
            const contained = entity.getRelatedProductDefinition();

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

        productDefinitionLines.forEach((entity, id) => {
            subject.next(progress++);

            const newId = id;
            const name = entity.getId();

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
     * Returns attributes of a line that are defined inside parantheses
     *
     * @param {String} attributesString a string that holds all attributes e.g.: "('',#101,POSITIVE_LENGTH_MEASURE(2.E-2),#95)"
     * @returns {Array<string>} An array of attributes
     */
    static getAttributes(attributesString) {
        return new AttributeParser(attributesString).parse(); // new Attribute Parser implementation
    }
}

export { StepToJsonParser };
