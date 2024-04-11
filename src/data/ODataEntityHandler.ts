import { DI } from "../core/DI";
import { ODataClient } from "../services/api/ODataClient";
import { EntityMetadata } from "./EntityMetadata";
import { EntityFieldUtils } from "./IEntityHandler";
import { IResultValue } from "./IResultValue";
import { EntityHandlerBase } from "./EntityHandlerBase";

export interface IODataEntityHandlerProps {
  url: string;
  resourceName: string;
  data?: any;
  onSave?: ((data: any) => Promise<IResultValue>) | null;
}

export class ODataEntityHandler extends EntityHandlerBase {
  url: string;
  resourceName: string;

  entityMeta: EntityMetadata | null = null;
  readyTask: Promise<any> | null = null;
  onSave?: ((data: any) => Promise<IResultValue>) | null = null;
  
  constructor(props: IODataEntityHandlerProps) {
    super();
    
    this.url = props.url;
    this.resourceName = props.resourceName;
    this.data = props.data;
    this.onSave = props.onSave;
  }

  public async readyAsync(key?: string) {
    if (this.readyTask) return this.readyTask;

    this.readyTask = (async () => {
      const client = DI.get(ODataClient);
      this.entityMeta = await client.getEntityMetadataAsync(
        this.url,
        this.resourceName
      );
      this.label ||= this.entityMeta.label;
      this.fields = await this.getInputFieldsAsync(key);
    })();

    return this.readyTask;
  }

  public async getInputFieldsAsync(key: string = 'default') {
    if (this.entityMeta) {
      const properties = this.entityMeta.getProperties(key);
      // console.log(properties);
      return EntityFieldUtils.convertPropertiesToFields(properties);
    } else {
      return [];
    }
  }

  public async saveAsync(): Promise<IResultValue> {
    if (this.onSave) {
      return await this.onSave(this.data);
    } else {
      const client = DI.get(ODataClient);
      return client.saveAsync(this.url, this.resourceName, this.data);
    }
  }
}