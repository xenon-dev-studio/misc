import { IProgramInfo } from "./public.js";

export interface message extends EditorMessageMap {
    "query-program-info": {
        params: [string];
        result: IProgramInfo | null;
    };
    "query-programs": {
        params: [];
        result: Record<string, Record<string, IProgramInfo>>;
    };
    "open-program": {
        params: [string, Record<string, any>?];
        result: Promise<boolean>;
    };
    "open-url": {
        params: [string, Record<string, any>?];
        result: Promise<boolean>;
    };
}
