import ODataStore from "devextreme/data/odata/store";
export interface ODataStoreBuildOptions {
    url: string;
    resourceName: string;
    key?: string;
}
export declare class LookupSource {
    source: ODataStore<any, any>;
    key: string;
    constructor(options: ODataStoreBuildOptions);
    field(field: string): {
        dataSource: ODataStore<any, any>;
        valueExpr: string;
        displayExpr: string;
    };
}
declare function Build(options: ODataStoreBuildOptions): Promise<ODataStore | string>;
declare function Lookup(options: ODataStoreBuildOptions): LookupSource;
export declare const ODataStoreBuilder: {
    Build: typeof Build;
    Lookup: typeof Lookup;
};
export {};
//# sourceMappingURL=ODataStoreBuilder.d.ts.map