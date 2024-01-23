import { IColumnProps } from "devextreme-react/cjs/data-grid";
import { LookupSource } from "./ODataStoreBuilder";
export declare class ColumnBuilder {
    static Money(field: string, caption: string): IColumnProps;
    static Lookup(lookupSource: LookupSource, keyField: string, field: string, caption: string): IColumnProps;
}
//# sourceMappingURL=DataGridHelper.d.ts.map