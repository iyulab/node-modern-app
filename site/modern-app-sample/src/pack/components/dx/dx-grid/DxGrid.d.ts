import { Component } from "react";
import DataGrid, { IColumnProps, DataGridTypes } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.light.css";
import ODataStore from "devextreme/data/odata/store";
import React from "react";
import { ODataStoreBuildOptions } from "../helpers/ODataStoreBuilder";
export declare class DxGridContext {
    grid: any;
    selectedKeys: any[];
    refresh(): void;
    init(grid: DxGrid): void;
}
export interface IDxGridEventHandler {
    onInitCellButtons?: (e: DataGridTypes.CellPreparedEvent) => void;
}
export interface IDxGridOptions {
    filter?: Array<any>;
}
export interface DxGridProps {
    odata?: ODataStoreBuildOptions;
    options?: IDxGridOptions;
    columns?: IColumnProps[];
    allowColumnReordering?: boolean;
    allowColumnResizing?: boolean;
    rowAlternationEnabled?: boolean;
    columnAutoWidth?: boolean;
    showBorders?: boolean;
    showColumnLines?: boolean;
    showRowLines?: boolean;
    showFilterRow?: boolean;
    showGroupPanel?: boolean;
    selectionMode?: "none" | "single" | "multiple";
    wordWrapEnabled?: boolean;
    context?: DxGridContext;
    eventHandler?: IDxGridEventHandler;
    allowAdd?: boolean;
    allowEdit?: boolean;
    allowDelete?: boolean;
}
interface DxGridState {
    dataSource: ODataStore | {
        store: ODataStore;
        filter?: [];
    } | null;
    isLoading: boolean;
    error: string | null;
}
export declare class DxGrid extends Component<DxGridProps, DxGridState> {
    dataGrid: React.RefObject<DataGrid>;
    constructor(props: DxGridProps);
    componentDidMount(): void;
    initODataStore(): Promise<void>;
    onExporting(e: DataGridTypes.ExportingEvent): void;
    onContentReady(): void;
    onEditorPreparing(): void;
    onCellPrepared(e: DataGridTypes.CellPreparedEvent): void;
    onSelectedRowKeysChange(values: any[]): void;
    refresh(): void;
    render(): import("react/jsx-runtime").JSX.Element;
    renderColumns(): any[];
    initColumns(): IColumnProps[] | any;
}
export {};
//# sourceMappingURL=DxGrid.d.ts.map