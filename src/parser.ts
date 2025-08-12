import { AdvancedBrepShapeRepresentation } from './entities/AdvancedBrepShapeRepresentation.ts';
import { AdvancedFace } from './entities/AdvancedFace.ts';
import { ApplicationContext } from './entities/ApplicationContext.ts';
import { Axis2Placement2d } from './entities/Axis2Placement2d.ts';
import { Axis2Placement3d } from './entities/Axis2Placement3d.ts';
import { BSplineCurveWithKnots } from './entities/BSplineCurveWithKnots.ts';
import { BSplineSurfaceWithKnots } from './entities/BSplineSurfaceWithKnots.ts';
import { CartesianPoint } from './entities/CartesianPoint.ts';
import { Circle } from './entities/Circle.ts';
import { ClosedShell } from './entities/ClosedShell.ts';
import { ColourRGB } from './entities/ColourRGB.ts';
import { ConicalSurface } from './entities/ConicalSurface.ts';
import { ContextDependentShapeRepresentation } from './entities/ContextDependentShapeRepresentation.ts';
import { CurveStyle } from './entities/CurveStyle.ts';
import { CylindricalSurface } from './entities/CylindricalSurface.ts';
import { DefinitionalRepresentation } from './entities/DefinitionalRepresentation.ts';
import { DescriptiveRepresentationItem } from './entities/DescriptiveRepresentationItem.ts';
import { Direction } from './entities/Direction.ts';
import { DraughtingPreDefinedColour } from './entities/DraughtingPreDefinedColour.ts';
import { DraughtingPreDefinedCurveFont } from './entities/DraughtingPreDefinedCurveFont.ts';
import { EdgeCurve } from './entities/EdgeCurve.ts';
import { EdgeLoop } from './entities/EdgeLoop.ts';
import { Ellipse } from './entities/Ellipse.ts';
import { FaceBound } from './entities/FaceBound.ts';
import { FillAreaStyle } from './entities/FillAreaStyle.ts';
import { FillAreaStyleColour } from './entities/FillAreaStyleColour.ts';
import { GeometricCurveSet } from './entities/GeometricCurveSet.ts';
import { ItemDefinedTransformation } from './entities/ItemDefinedTransformation.ts';
import { Line } from './entities/Line.ts';
import { ManifoldSolidBrep } from './entities/ManifoldSolidBrep.ts';
import { MechanicalDesignGeometricPresentationRepresentation } from './entities/MechanicalDesignGeometricPresentationRepresentation.ts';
import { NextAssemblyUsageOccurrence } from './entities/NextAssemblyUsageOccurrence.ts';
import { OpenShell } from './entities/OpenShell.ts';
import { OrientedEdge } from './entities/OrientedEdge.ts';
import { OverRidingStyledItem } from './entities/OverRidingStyledItem.ts';
import { Pcurve } from './entities/Pcurve.ts';
import { Plane } from './entities/Plane.ts';
import { PresentationLayerAssignment } from './entities/PresentationLayerAssignment.ts';
import { PresentationStyleAssignment } from './entities/PresentationStyleAssignment.ts';
import { Product } from './entities/Product.ts';
import { ProductContext } from './entities/ProductContext.ts';
import { ProductDefinition } from './entities/ProductDefinition.ts';
import { ProductDefinitionContext } from './entities/ProductDefinitionContext.ts';
import { ProductDefinitionFormation } from './entities/ProductDefinitionFormation.ts';
import { ProductDefinitionShape } from './entities/ProductDefinitionShape.ts';
import { ProductRelatedProductCategory } from './entities/ProductRelatedProductCategory.ts';
import { PropertyDefinition } from './entities/PropertyDefinition.ts';
import { PropertyDefinitionRepresentation } from './entities/PropertyDefinitionRepresentation.ts';
import { Representation } from './entities/Representation.ts';
import { SeamCurve } from './entities/SeamCurve.ts';
import { ShapeDefinitionRepresentation } from './entities/ShapeDefinitionRepresentation.ts';
import { ShapeRepresentation } from './entities/ShapeRepresentation.ts';
import { ShellBasedSurfaceModel } from './entities/ShellBasedSurfaceModel.ts';
import { SphericalSurface } from './entities/SphericalSurface.ts';
import { StyledItem } from './entities/StyledItem.ts';
import { SurfaceCurve } from './entities/SurfaceCurve.ts';
import { SurfaceOfLinearExtrusion } from './entities/SurfaceOfLinearExtrusion.ts';
import { SurfaceSideStyle } from './entities/SurfaceSideStyle.ts';
import { SurfaceStyleFillArea } from './entities/SurfaceStyleFillArea.ts';
import { SurfaceStyleUsage } from './entities/SurfaceStyleUsage.ts';
import { ToroidalSurface } from './entities/ToroidalSurface.ts';
import { TrimmedCurve } from './entities/TrimmedCurve.ts';
import { UncertaintyMeasureWithUnit } from './entities/UncertaintyMeasureWithUnit.ts';
import { Vector } from './entities/Vector.ts';
import { VertexLoop } from './entities/VertexLoop.ts';
import { VertexPoint } from './entities/VertexPoint.ts';
import { fixSpecialChars } from './utils.ts';
import { createInterface } from 'node:readline';
import type { ReadStream } from 'node:fs';

// Public types
export type ParserOptions = { force?: boolean; printStatus?: boolean };
export type StpHeader = {
    fileName: string;
    fileSchema: string;
    fileDescription: string;
};

export type ProductInfo = { id: string; name: string };
export type RelationInfo = { id: string; container: string; contains: string };
export type AssemblyNode = {
    id: string;
    name: string;
    contains: AssemblyNode[];
};

type EntityCtor = new (parameters: string) => any;
type EntitiesMap = Record<string, EntityCtor>;

export type PreprocessedFile = {
    header: StpHeader;
    data: Record<string, Map<string, any>>;
};

class StepToJsonParser {
    public entities: EntitiesMap = {
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
        CONTEXT_DEPENDENT_SHAPE_REPRESENTATION:
            ContextDependentShapeRepresentation,
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
        VERTEX_POINT: VertexPoint,
    };

    private printStatus: boolean;
    private forceParse: boolean;
    private file: ReadStream;
    private preprocessedFile: PreprocessedFile;
    private products: ProductInfo[] = [];
    private relations: RelationInfo[] = [];

    constructor(file: ReadStream, parserOptions: ParserOptions = {}) {
        this.printStatus = parserOptions.printStatus ?? false;
        this.forceParse = parserOptions.force ?? false;
        this.file = file;
        this.preprocessedFile = {
            header: {
                fileDescription: '',
                fileName: '',
                fileSchema: '',
            },
            data: {},
        };
    }

    async parse(): Promise<AssemblyNode> {
        await this.preprocessFile();
        this.parseProductDefinitions(
            this.preprocessedFile.data.PRODUCT_DEFINITION!,
        );
        this.parseNextAssemblyUsageOccurences(
            this.preprocessedFile.data.NEXT_ASSEMBLY_USAGE_OCCURRENCE!,
        );
        const rootAssembly = this.identifyRootAssembly();
        if (!rootAssembly) throw new Error('Root component could not be found');
        const result = this.buildStructureObject(rootAssembly);
        return result;
    }

    async preprocessFile(): Promise<PreprocessedFile> {
        console.time('preprocessor');
        function createErrorMessage(message: string): string {
            return `Line: ${lineCount} | ${message}`;
        }

        let lineCount = 1;
        const activeSections: string[] = [];
        const lines: string[] = [];
        try {
            const rl = createInterface({
                input: this.file,
                crlfDelay: Infinity,
            });

            for await (const line of rl) {
                let current = line as string;
                if (
                    lines.length > 0 &&
                    !lines[lines.length - 1]?.endsWith(';')
                ) {
                    lines[lines.length - 1] += current;
                } else {
                    lines.push(current);
                }
            }
        } catch (error) {
            throw new Error(
                createErrorMessage(`Error while parsing step file`),
                {
                    cause: error as Error,
                } as any,
            );
        }

        const filePrefix = lines.shift();
        if (!filePrefix || !(filePrefix == 'ISO-10303-21;' || this.forceParse))
            throw new Error(
                createErrorMessage(
                    'Unsupported step file provided. First line does not match ISO-10303-21',
                ),
            );

        for (const line of lines) {
            lineCount += 1;

            if (['HEADER;', 'DATA;'].includes(line)) {
                activeSections.push(line);
                continue;
            }

            if (line == 'ENDSEC;') {
                activeSections.pop();
                continue;
            }

            if (line == 'END-ISO-10303-21;') {
                break; // File end detected, exit processor loop
            }

            if (activeSections.length == 0) continue;
            const currentSection = activeSections[activeSections.length - 1];

            if (currentSection == 'HEADER;') {
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
            } else if (currentSection == 'DATA;') {
                const match = line.match(/^#([0-9]*)[= ]*([A-Z_0-9]*)([^]*)$/);
                if (!match) continue;
                const [, instanceName, entity, parameters] = match;

                // if (!entity) {
                //     throw new Error(
                //         createErrorMessage(
                //             `Entity name not found in line: ${line}`,
                //         ),
                //     );
                // }

                if (!parameters) {
                    throw new Error(
                        createErrorMessage(
                            `Parameters not found in line: ${line}`,
                        ),
                    );
                }

                if (!instanceName) {
                    throw new Error(
                        createErrorMessage(
                            `Instance name not found in line: ${line}`,
                        ),
                    );
                }

                if (!this.preprocessedFile.data[entity]) {
                    this.preprocessedFile.data[entity] = new Map();
                }

                if (this.printStatus && lineCount % 10000 == 0) {
                    const memoryUsage = process.memoryUsage();
                    const cpuUsage = process.cpuUsage();

                    // eslint-disable-next-line no-console
                    console.log(`\n${lineCount}/${lines.length}`);
                    // eslint-disable-next-line no-console
                    console.log('\nMemory Usage:');
                    // eslint-disable-next-line no-console
                    console.log(
                        `- RSS (Resident Set Size): ${Math.round(memoryUsage.rss / (1024 * 1024))} MB`,
                    );
                    // eslint-disable-next-line no-console
                    console.log(
                        `- Heap Total: ${Math.round(memoryUsage.heapTotal / (1024 * 1024))} MB`,
                    );
                    // eslint-disable-next-line no-console
                    console.log(
                        `- Heap Used: ${Math.round(memoryUsage.heapUsed / (1024 * 1024))} MB`,
                    );
                    // eslint-disable-next-line no-console
                    console.log(
                        `- External: ${Math.round(memoryUsage.external / (1024 * 1024))} MB`,
                    );

                    // eslint-disable-next-line no-console
                    console.log('\nCPU Usage:');
                    // eslint-disable-next-line no-console
                    console.log(`- User CPU Time: ${cpuUsage.user / 1000} ms`);
                    // eslint-disable-next-line no-console
                    console.log(
                        `- System CPU Time: ${cpuUsage.system / 1000} ms`,
                    );
                }

                const targetEntity = this.entities[entity];
                if (targetEntity) {
                    this.preprocessedFile.data[entity].set(
                        instanceName,
                        new targetEntity(parameters),
                    );
                } else {
                    if (this.printStatus)
                        // eslint-disable-next-line no-console
                        console.log(`Not Implemented entity: ${entity}`);
                }
            }
        }

        console.timeEnd('preprocessor');
        return this.preprocessedFile;
    }

    parseNextAssemblyUsageOccurences(
        nextAssemblyUsageOccurences: Map<string, any>,
    ): RelationInfo[] {
        const assemblyRelations: RelationInfo[] = [];
        nextAssemblyUsageOccurences.forEach((entity: any, id: string) => {
            const newId = id;

            const container = entity.getRelatingProductDefinition();
            const contained = entity.getRelatedProductDefinition();

            const assemblyObject: RelationInfo = {
                id: newId,
                container: container,
                contains: contained,
            };
            assemblyRelations.push(assemblyObject);
        });

        this.relations = assemblyRelations;
        return assemblyRelations;
    }

    parseProductDefinitions(
        productDefinitionLines: Map<string, any>,
    ): ProductInfo[] {
        const products: ProductInfo[] = [];

        productDefinitionLines.forEach((entity: any, id: string) => {
            const newId = id;
            const name = entity.getId();

            const productObject: ProductInfo = {
                id: newId,
                name: fixSpecialChars(name),
            };
            products.push(productObject);
        });
        this.products = products;
        return products;
    }

    identifyRootAssembly(): ProductInfo | undefined {
        if (this.products.length === 1) {
            return this.products[0];
        }

        try {
            let rootComponent: ProductInfo | undefined;
            this.products.forEach((product) => {
                const productIsContainer = this.relations.some(
                    (relation) => relation.container === product.id,
                );

                const productIsContained = this.relations.some(
                    (relation) => relation.contains === product.id,
                );

                if (productIsContainer && !productIsContained) {
                    rootComponent = product;
                }
            });

            return rootComponent;
        } catch (error) {
            throw new Error('Root component could not be found', {
                cause: error as Error,
            } as any);
        }
    }

    buildStructureObject(rootProduct: ProductInfo): AssemblyNode {
        const structureObject: AssemblyNode = {
            id: rootProduct.id,
            name: rootProduct.name,
            contains: [],
        };

        this.relations.forEach((relation) => {
            if (relation.container === rootProduct.id) {
                const containedProduct = this.getContainedProduct(
                    relation.contains,
                )!;
                structureObject.contains.push(
                    this.buildStructureObject(containedProduct),
                );
            }
        });

        return structureObject;
    }

    isContainer(productId: string): boolean {
        return this.relations.some(
            (element) => element.container === productId,
        );
    }

    getContainedProduct(relationContainsId: string): ProductInfo | undefined {
        return this.products.find(
            (product) => product.id === relationContainsId,
        );
    }
}

export { StepToJsonParser };
