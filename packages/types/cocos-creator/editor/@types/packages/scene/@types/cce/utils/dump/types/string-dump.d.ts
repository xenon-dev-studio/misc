import { IProperty } from "../../../../../source/public.js.js.js";
import { DumpInterface } from "../../../../../source/script/utils/dump/types/dump-interface.js";
declare class StringDump implements DumpInterface {
    encode(object: any, data: IProperty, opts?: any): void;
    decode(data: any, info: any, dump: any, opts?: any): void;
}
export declare const stringDump: StringDump;
export { };
//# sourceMappingURL=string-dump.d.ts.map
