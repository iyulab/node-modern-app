import { LitElement } from 'lit';
import '../elements';
import { Dialog } from "@microsoft/fast-components";
export type InputDialogOptions = {
    format?: string;
    value?: string;
};
export declare class InputDialog extends LitElement {
    static styles: import("lit").CSSResult[];
    boundCancel: () => void;
    dialog?: Dialog;
    title: string;
    message: string;
    format: string;
    value: string;
    resolve?: (value: {
        success: boolean;
        value: string;
    } | PromiseLike<{
        success: boolean;
        value: string;
    }>) => void;
    reject?: (reason?: any) => void;
    constructor();
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    ok(): void;
    cancel(): void;
    showAsync(title: string, message: string, options?: InputDialogOptions): Promise<{
        success: boolean;
        value: string;
    }>;
    visible(): void;
    close(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'input-dialog': InputDialog;
    }
}
//# sourceMappingURL=InputDialog.d.ts.map