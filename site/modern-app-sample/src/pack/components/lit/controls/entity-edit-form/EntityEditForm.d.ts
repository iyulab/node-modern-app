import { LitElement } from "lit";
import { IEntityHandler, IResultValue } from "@iyulab/modern-app/data";
import { IDialogContent } from "../../dialogs";
export interface IEntityEditFormProps {
    handler: IEntityHandler;
}
export declare class EntityEditForm extends LitElement implements IEntityEditFormProps, IDialogContent {
    static styles: import("lit").CSSResult[];
    handler: IEntityHandler;
    fields: any;
    errors?: string[];
    isReady: boolean;
    isBusy: boolean;
    constructor(props: IEntityEditFormProps);
    init(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    renderErrors(): import("lit-html").TemplateResult<1>;
    validation(): boolean;
    ok(): Promise<void>;
    cancel(): void;
    close(result: IResultValue): void;
}
//# sourceMappingURL=EntityEditForm.d.ts.map