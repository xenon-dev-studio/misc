import Gizmo from "../../../../../../../../source/script/public/gizmos/3d/elements/gizmo-base.js";
declare class CapsuleCharacterControllerComponentGizmo extends Gizmo {
    private _maxScale;
    private _radius;
    private _height;
    private _controller;
    private _propPath;
    init(): void;
    onShow(): void;
    onHide(): void;
    createController(): void;
    onControllerMouseDown(): void;
    onControllerMouseMove(): void;
    onControllerMouseUp(): void;
    updateDataFromController(): void;
    updateControllerTransform(): void;
    updateControllerData(): void;
    onTargetUpdate(): void;
    onNodeChanged(): void;
    private getMaxScale;
}
export default CapsuleCharacterControllerComponentGizmo;
//# sourceMappingURL=capsule-character-controller-component-gizmo.d.ts.map
