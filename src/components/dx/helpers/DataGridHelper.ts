import { IColumnProps } from "devextreme-react/cjs/data-grid";
import { LookupSource } from "./ODataStoreBuilder";

export class ColumnBuilder {
  static DateTime(dataField: string, caption: string): IColumnProps {
    return {
      dataType: "datetime",
      dataField: dataField,
      caption: caption,
      format: "yyyy-MM-dd HH:mm",
      filterOperations: ["=", "<>", "<", ">", "<=", ">=", "between"],
      selectedFilterOperation: "between",
    }
  }
  public static String(dataField: string, caption: string): IColumnProps {
    return { dataType: "string", dataField: dataField, caption: caption };
  }

  public static Money(field: string, caption: string): IColumnProps {
    return {
      dataType: "number",
      dataField: field, 
      caption: caption, 
      format: { type: "number", formatter: (value) => value.toLocaleString() } 
    };
  }

  public static Lookup(p: {
    lookupSource: LookupSource, 
    dataField: string, 
    field: string, 
    caption: string
  }): IColumnProps {

    // 사용법:
    // ColumnBuilder.Lookup({
    //   lookupSource: productListsSource,
    //   dataField: "ProductList_key",
    //   field: "VendorNumber",
    //   caption: "중도매인번호",
    // }),
    // 풀이:
    // {
    //   dataField: "ProductList_key",
    //   caption: "중도매인번호",
    //   lookup: {
    //     dataSource: new ODataStore({
    //       url: `https://localhost:7040/$data/ProductLists`,
    //       key: "_key",
    //       version: 4,
    //     }),
    //     valueExpr: "_key",
    //     displayExpr: "VendorNumber",
    //   },
    // },

    return { 
      dataField: p.dataField, 
      caption: p.caption,
      lookup: p.lookupSource.field(p.field)
    }
  }
}