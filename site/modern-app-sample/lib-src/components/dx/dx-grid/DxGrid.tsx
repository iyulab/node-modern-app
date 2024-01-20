import { Component } from "react";
import DataGrid, {
  Selection,
  FilterRow,
  GroupPanel,
  IColumnProps,
  Pager,
  Paging,
  Export,
  DataGridTypes,
  Grouping,
  ColumnChooser,
  ColumnFixing,
  SearchPanel,
  Column,
} from "devextreme-react/data-grid";

import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";

import "devextreme/dist/css/dx.light.css";

import ODataStore from "devextreme/data/odata/store";
import React from "react";
import {
  ODataStoreBuilder,
  ODataStoreBuildOptions,
} from "../helpers/ODataStoreBuilder";

export class DxGridContext {
  grid: any;
  selectedKeys: any[] = [];

  refresh() {
    this.grid.selectedKeys = [];
    this.grid.refresh();
  }

  init(grid: DxGrid) {
    this.grid = grid;
  }
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

const defaultProps: DxGridProps = {
  allowColumnReordering: true,
  allowColumnResizing: true,
  rowAlternationEnabled: true,
  columnAutoWidth: true,
  showBorders: false,
  showColumnLines: false,
  showRowLines: false,
  showFilterRow: true,
  showGroupPanel: false,
  selectionMode: "single",
  wordWrapEnabled: false,
};

interface DxGridState {
  dataSource: ODataStore | { store: ODataStore; filter?: [] } | null;
  isLoading: boolean;
  error: string | null;
}

const defaultState: DxGridState = {
  dataSource: null,
  isLoading: true,
  error: null,
};

const exportFormats = ["xlsx"]; //, 'pdf'

export class DxGrid extends Component<DxGridProps, DxGridState> {
  dataGrid: React.RefObject<DataGrid>;

  constructor(props: DxGridProps) {
    super(props);
    this.state = defaultState;

    this.onExporting = this.onExporting.bind(this);
    this.onContentReady = this.onContentReady.bind(this);
    this.onEditorPreparing = this.onEditorPreparing.bind(this);
    this.onCellPrepared = this.onCellPrepared.bind(this);
    this.onSelectedRowKeysChange = this.onSelectedRowKeysChange.bind(this);

    this.dataGrid = React.createRef();

    props.context?.init(this);
  }

  componentDidMount() {
    if (this.props.odata) {
      this.initODataStore();
    }
  }

  async initODataStore() {
    const odata = this.props.odata!;

    const result = await ODataStoreBuilder.Build(odata);
    if (result instanceof ODataStore) {
      this.setState({
        dataSource: {
          store: result,
          // @ts-expect-error 설명: filter가 없는 경우도 있음
          filter: this.props.options?.filter,
        },
        isLoading: false,
      });
    } else {
      // 오류가 발생했을 때의 처리
      this.setState({ error: result, isLoading: false });
    }
  }

  onExporting(e: DataGridTypes.ExportingEvent) {
    if (e.format === "xlsx") {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Main sheet");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component,
      }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "DataGrid.xlsx"
          );
        });
      });
    } else if (e.format === "pdf") {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save("DataGrid.pdf");
      });
    }
  }

  onContentReady() {
    // e: DataGridTypes.ContentReadyEvent
    // console.log('onContentReady', e);
  }

  onEditorPreparing() {
    // e: DataGridTypes.EditorPreparingEvent
    // console.log('onEditorPreparing', e);
  }

  onCellPrepared(e: DataGridTypes.CellPreparedEvent) {
    // console.log('onCellPrepared', e);
    if (e.column.type == "buttons" && e.rowType == "data") {
      this.props.eventHandler?.onInitCellButtons?.(e);
    }
  }

  onSelectedRowKeysChange(values: any[]) {
    // console.log('onSelectedRowKeysChange', values);
    if (this.props.context) {
      this.props.context.selectedKeys = values;
    }
  }

  refresh() {
    this.dataGrid.current?.instance.refresh();
  }

  render() {
    const { dataSource, isLoading, error } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (!dataSource) {
      return <p>No data</p>;
    }

    // const editing: DataGridTypes.Editing = {
    //   mode: "popup",
    //   allowAdding: this.props.allowAdd ?? false,
    //   allowUpdating: this.props.allowEdit ?? false,
    //   allowDeleting: this.props.allowDelete ?? false,
    // };

    return (
      <DataGrid
        ref={this.dataGrid}
        dataSource={dataSource}
        // defaultColumns={this.initColumns()}
        // columns={this.initColumns()}
        allowColumnReordering={
          this.props.allowColumnReordering ?? defaultProps.allowColumnReordering
        }
        allowColumnResizing={
          this.props.allowColumnResizing ?? defaultProps.allowColumnResizing
        }
        rowAlternationEnabled={
          this.props.rowAlternationEnabled ?? defaultProps.rowAlternationEnabled
        }
        columnAutoWidth={
          this.props.columnAutoWidth ?? defaultProps.columnAutoWidth
        }
        columnMinWidth={40}
        showBorders={this.props.showBorders ?? defaultProps.showBorders}
        showColumnLines={
          this.props.showColumnLines ?? defaultProps.showColumnLines
        }
        showRowLines={this.props.showRowLines ?? defaultProps.showRowLines}
        wordWrapEnabled={
          this.props.wordWrapEnabled ?? defaultProps.wordWrapEnabled
        }
        onExporting={this.onExporting}
        onContentReady={this.onContentReady}
        onEditorPreparing={this.onEditorPreparing}
        onCellPrepared={this.onCellPrepared}
        onSelectedRowKeysChange={this.onSelectedRowKeysChange}
        // editing={editing}
      >
        {this.renderColumns()}
        <ColumnChooser enabled={false} />
        <ColumnFixing enabled={true} />

        <Selection
          mode={this.props.selectionMode ?? defaultProps.selectionMode}
        />
        <FilterRow
          visible={this.props.showFilterRow ?? defaultProps.showFilterRow}
        />
        <GroupPanel
          visible={this.props.showGroupPanel ?? defaultProps.showGroupPanel}
        />
        <Grouping autoExpandAll={false} />
        <SearchPanel visible={false} />

        <Export enabled={true} formats={exportFormats} />

        <Pager
          allowedPageSizes={[10, 25, 50, 100]}
          showPageSizeSelector={true}
        />
        <Paging defaultPageSize={10} />
      </DataGrid>
    );
  }

  renderColumns() {
    if (this.props.columns) {
      const columns: any[] = [];
      for (const column of this.props.columns) {
        const key = column.dataField ?? column.name;
        if (column.buttons) {
          columns.push(<Column key={key} {...column} />);
        } else {
          columns.push(<Column key={key} {...column} />);
        }
      }
      return columns;
    } else {
      return [];
    }
  }

  initColumns(): IColumnProps[] | any {
    // let type: import('devextreme-react/data-grid').IColumnProps;
    return this.props.columns ?? null;
  }
}
