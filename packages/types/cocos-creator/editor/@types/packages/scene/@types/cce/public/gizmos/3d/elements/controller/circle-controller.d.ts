import { Color, Node, Vec3 } from "cc";
import EditableController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/editable-controller.js";
import { IControlMouseEvent } from "../../../../../../../source/script/public/gizmos/defines.js";
declare class CircleController extends EditableController {
    private _oriDir;
    private _center;
    private _radius;
    private _arc;
    private _deltaRadius;
    private _circleNode;
    private _circleFromDir;
    private _circleMR;
    private _mouseDeltaPos;
    private _curDistScalar;
    private _controlDir;
    constructor(rootNode: Node);
    get radius(): number;
    set radius(value: number);
    setColor(color: Color): void;
    _updateEditHandle(axisName: string): void;
    initShape(): void;
    updateSize(center: Vec3, radius: number, arc: number): void;
    onMouseDown(event: IControlMouseEvent): void;
    onMouseMove(event: IControlMouseEvent): void;
    onMouseUp(event: IControlMouseEvent): void;
    onMouseLeave(event: IControlMouseEvent): void;
    getDeltaRadius(): number;
    getControlDir(): Vec3;
}
export default CircleController;
//# sourceMappingURL=circle-controller.d.ts.map
