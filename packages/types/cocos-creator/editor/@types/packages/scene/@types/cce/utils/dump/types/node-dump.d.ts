import { IProperty } from "../../../../../source/public.js.js.js";
import { DumpInterface } from "../../../../../source/script/utils/dump/types/dump-interface.js";
declare class NodeDump implements DumpInterface {
    encode(object: any, data: IProperty, opts?: any): void;
    decode(data: any, info: any, dump: any, opts?: any): void;
}
export declare const nodeDump: NodeDump;
export { };
//# sourceMappingURL=node-dump.d.ts.map
