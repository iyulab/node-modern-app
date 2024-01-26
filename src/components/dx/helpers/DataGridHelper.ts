import { IColumnProps } from "devextreme-react/cjs/data-grid";
import { LookupSource } from "./ODataStoreBuilder";


export class ColumnBuilder {

  public static Money(field: string, caption: string): IColumnProps {
    return {
      dataField: field, 
      caption: caption, 
      format: { type: "number", formatter: (value) => value.toLocaleString() } 
    };
  }

  static Lookup(lookupSource: LookupSource, keyField: string, field: string, caption: string): IColumnProps {
    return { 
      dataField: keyField, 
      caption: caption,
      lookup: lookupSource.field(field)
    }
  }
}