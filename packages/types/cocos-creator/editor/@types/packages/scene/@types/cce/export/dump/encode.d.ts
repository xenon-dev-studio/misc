import { Node } from "cc";
import { IComponent, INode, IProperty, IScene } from "../../../../source/public.js.js.js";
/**
 * 编码一个 node 数据
 * @param node
 */
export declare function encodeNode(node: Node): INode;
/**
 * 编码一个场景数据
 * @param scene
 */
export declare function encodeScene(scene: any): IScene;
/**
 * 编码一个 component
 * @param component
 */
export declare function encodeComponent(component: any): IComponent;
/**
 * 编码一个对象
 * @param object 编码对象
 * @param attributes 属性描述
 * @param owner 编码对象所属的对象
 * @param objectKey 输出有效信息，当前数据 key，以便问题排查
 */
export declare function encodeObject(object: any, attributes: any, owner?: any, objectKey?: string, isTemplate?: boolean): IProperty;
export * as default from "../../../../source/script/export/dump/encode.js";
//# sourceMappingURL=encode.d.ts.map
