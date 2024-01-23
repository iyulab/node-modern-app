import { EntityMetadata } from "@iyulab/modern-app/data";
import { IResultValue } from "@iyulab/modern-app/data/IResultValue";
export declare class ODataClient {
    private getAsync;
    private postAsync;
    getEntityMetadataAsync(url: string, resourceName: string): Promise<EntityMetadata>;
    saveAsync(url: string, resourceName: string, data: any): Promise<IResultValue>;
}
//# sourceMappingURL=ODataClient.d.ts.map