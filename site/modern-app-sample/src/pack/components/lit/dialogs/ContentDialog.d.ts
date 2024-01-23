import { LitElement } from 'lit';
import { Dialog } from "@microsoft/fast-components";
export declare class ContentDialog extends LitElement {
    static styles: import("lit").CSSResult[];
    positiveText: string;
    negativeText: string;
    useNegative: boolean;
    hiddenButtons: boolean;
    boundCancel: () => void;
    dialog?: Dialog;
    errors?: string[];
    title: string;
    content: null;
    resolve?: (value: {
        success: boolean;
        value: any;
    } | PromiseLike<{
        success: boolean;
        value: any;
    }>) => void;
    reject?: (reason?: any) => void;
    validationHandler?: () => string[];
    constructor();
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    ok(): void;
    cancel(): void;
    showAsync(title: string): Promise<{
        success: boolean;
        value: any;
    }>;
    visible(): void;
    close(): void;
}
//# sourceMappingURL=ContentDialog.d.ts.map