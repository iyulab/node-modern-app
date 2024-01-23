import { LitElement } from 'lit';
import { Dialog } from "@microsoft/fast-components";
export declare class MessageDialog extends LitElement {
    static styles: import("lit").CSSResult[];
    positiveText: string;
    negativeText: string;
    useNegative: boolean;
    boundCancel: () => void;
    dialog?: Dialog;
    title: string;
    message: string;
    resolve?: (value: boolean | PromiseLike<boolean>) => void;
    reject?: (reason?: any) => void;
    constructor();
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    initOk(): void;
    initOkCancel(): void;
    initYesNo(): void;
    initCustom(positiveText: string, negativeText: string, useNegative?: boolean): void;
    ok(): void;
    cancel(): void;
    showAsync(title: string, message: string): Promise<boolean>;
    visible(): void;
    close(): void;
}
export declare const MessageDialogComponent: import("@lit-labs/react").ReactWebComponent<MessageDialog, {}>;
//# sourceMappingURL=MessageDialog.d.ts.map