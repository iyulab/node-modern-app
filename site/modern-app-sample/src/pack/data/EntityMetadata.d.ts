export interface IEntityProperty {
    name: string;
    type: string;
    required?: boolean;
    maxLength?: number;
    label?: string;
    unique?: boolean;
    input?: string;
}
export declare class EntityMetadata {
    name: string;
    label: string;
    properties: IEntityProperty[];
    constructor(data: any);
    getProperties(key?: string): IEntityProperty[];
}
//# sourceMappingURL=EntityMetadata.d.ts.map