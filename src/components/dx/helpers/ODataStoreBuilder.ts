import ODataStore from "devextreme/data/odata/store";

export interface ODataStoreBuildOptions {
  url: string;
  accessToken?: string | null;
  resourceName: string;
  key?: string;
  fieldTypes?: {};
  keyType?: string;
  expand?: string; // "ProductList($expand=Account)"
}

export class LookupSource {


  key: string;
  options: ODataStoreBuildOptions;
  store?: ODataStore;
  
  constructor(options: ODataStoreBuildOptions) {
    this.key = options.key || '_key';
    this.options = options;
  }

  field(field: string) {
    
    if (this.store == null) {
      this.store = ODataStoreBuilder.Build(this.options);  
    }
    
    return {
      dataSource: this.store,
      valueExpr: this.key,
      displayExpr: field
    }    
  }
}

// ### usage:

function Build(options: ODataStoreBuildOptions) {
  
  const keyType = options.keyType || 'String';
  
  const store = new ODataStore({
    version: 4,
    url: `${options.url}/${options.resourceName}`,
    key: `${options.key}`,
    keyType: keyType,
    fieldTypes: options.fieldTypes,
    deserializeDates: true,
    withCredentials: options.accessToken ? true : false,
    beforeSend: (request) => {
      if (options.accessToken) {
        request.headers['Authorization'] = `Bearer ${options.accessToken}`;
      }
      if (options.expand) {
        request.params.$expand = options.expand;
      }
    },
    onLoaded: () => {
      // console.log('odata, onLoaded');
    },
  });

  return store;
}


// const result = await ODataStoreBuild({ url: 'your-url', resourceName: 'your-resource' });

//   if (result instanceof ODataStore) {
//     // 성공적으로 ODataStore 객체가 반환되었을 때의 처리
//     this.setState({ dataSource: { store: result, filter: this.props.options?.filter }, isLoading: false });
//   } else {
//     // 오류가 발생했을 때의 처리
//     this.setState({ error: result, isLoading: false });
//   }  
async function BuildAsync(options: ODataStoreBuildOptions): Promise<ODataStore | string> {
  
  try {
    const response = await fetch(`${options.url}/$metadata#${options.resourceName}`);
    const str = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(str, "application/xml");

    const fieldTypes = {};
    const keyName = xml.querySelector('Key PropertyRef')?.getAttribute('Name');

    // 모든 Property의 Name과 Type 추출
    const properties = xml.querySelectorAll('Property');
    const propertyDetails = Array.from(properties).map(prop => ({
      name: prop.getAttribute('Name')!,
      type: prop.getAttribute('Type')!
    }));

    for (const p of propertyDetails) {
      let type = p.type;
      if (type.startsWith('Edm.')) {
        type = type.replace('Edm.', '');
      }

      // type 허용범위 "String", "Int32", "Int64", "Guid"
      if (type == 'String' || type == 'Boolean' || type == 'Guid') {
        // 아무것도 하지 않음
      } else if (type == 'Int32' || type == 'Int64' || type == "Decimal") {
        type = "Number";
      } else if (type == 'Date' || type == 'DateTime' || type == 'DateTimeOffset') {
        //type = "Date"; // 필터에서 오류메시지가 표시됨. 그냥 continue 처리하면 우선 해결됨..
        continue;
      } else {
        console.error(`Error: ${type} is not supported`);
      }
      
      (<any>fieldTypes)[p.name] = type;
    }

    options.key = keyName || '_key';
    options.fieldTypes = fieldTypes;
    
    return Build(options);
    
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
}

function Lookup(options: ODataStoreBuildOptions) {
  return new LookupSource(options);
}

export const ODataStoreBuilder = {
  Build,
  BuildAsync,
  Lookup
}