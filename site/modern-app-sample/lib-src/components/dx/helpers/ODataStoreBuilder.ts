import ODataStore from "devextreme/data/odata/store";

export interface ODataStoreBuildOptions {
  url: string;
  resourceName: string;
  key?: string;
}

export class LookupSource {

  source: ODataStore<any, any>;
  key: string;
  
  constructor(options: ODataStoreBuildOptions) {
    this.key = options.key || '_key';

    this.source = new ODataStore({
      url: `${options.url}/${options.resourceName}`,
      key: this.key,
      version: 4
    })
  }

  field(field: string) {
    return {
      dataSource: this.source,
      valueExpr: this.key,
      displayExpr: field
    }    
  }
}

// ### usage:

// const result = await ODataStoreBuild({ url: 'your-url', resourceName: 'your-resource' });

//   if (result instanceof ODataStore) {
//     // 성공적으로 ODataStore 객체가 반환되었을 때의 처리
//     this.setState({ dataSource: { store: result, filter: this.props.options?.filter }, isLoading: false });
//   } else {
//     // 오류가 발생했을 때의 처리
//     this.setState({ error: result, isLoading: false });
//   }  
async function Build(options: ODataStoreBuildOptions): Promise<ODataStore | string> {
  
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
      fieldTypes[p.name] = type;
    }

    const store = new ODataStore({
      version: 4,
      url: `${options.url}/${options.resourceName}`,
      key: `${keyName}`,
      keyType: 'Guid',
      fieldTypes: fieldTypes,
      onLoaded: () => {
        // console.log('odata, onLoaded');
      },
      beforeSend: () => {
        // console.log('odata, beforeSend', request);
      }
    });

    return store;
    
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
}

function Lookup(options: ODataStoreBuildOptions) {
  
  const lookupSource = new LookupSource(options);
  return  lookupSource;
}

export const ODataStoreBuilder = {
  Build,
  Lookup
}