import { ParticleSystem, Vec3 } from "cc";
import BoxController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/box-controller.js";
import CircleController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/circle-controller.js";
import HemisphereController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/hemisphere-controller.js";
import ConeController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/particlesystem-cone-controller.js";
import SphereController from "../../../../../../../source/script/public/gizmos/3d/elements/controller/sphere-controller.js";
import Gizmo from "../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class ParticleSystemComponentGizmo extends Gizmo {
    private _curEmitterShape;
    private _shapeControllers;
    private _PSGizmoColor;
    private _activeController;
    private _pSGizmoRoot;
    private _boundingBoxController;
    private _scale;
    private _size;
    private _radius;
    private _arc;
    private _coneHeight;
    private _coneAngle;
    private _bottomRadius;
    private _bbHalfSize;
    init(): void;
    createController(): void;
    onShow(): void;
    onHide(): void;
    createControllerByShape(shape: any): BoxController | CircleController | HemisphereController | ConeController | SphereController | null;
    getControllerByShape(shape: any): any;
    getConeData(psComp: ParticleSystem): {
        topRadius: number;
        height: number;
        bottomRadius: number;
        coneAngle: number;
    };
    modifyConeData(psComp: ParticleSystem, deltaTopRadius: number, deltaHeight: number, deltaBottomRadius: number): void;
    setCurveRangeInitValue(curve: any, value: any): void;
    onControllerMouseDown(): void;
    onControllerMouseMove(): void;
    onControllerMouseUp(): void;
    getScaledDeltaRadius(deltaRadius: number, controlDir: Vec3, scale: Vec3): number;
    updateDataFromController(): void;
    updateControllerTransform(): void;
    getConeRadius(angle: number, height: number): number;
    updateControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
    updateDataFromBBController(): void;
    updateBBControllerData(): void;
    onBBControllerMouseDown(): void;
    onBBControllerMouseMove(): void;
    onBBControllerMouseUp(): void;
    showBoundingBox(isShow: boolean): void;
    isShowBoundingBox(): any;
}
export default ParticleSystemComponentGizmo;
//# sourceMappingURL=particle-system-component-gizmo.d.ts.map