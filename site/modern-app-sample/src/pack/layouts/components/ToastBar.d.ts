import { LitElement } from 'lit';
export declare class ToastBar extends LitElement {
    private hideTimeout?;
    private closeTimeout?;
    private expanded;
    container: HTMLDivElement;
    body: HTMLDivElement;
    status?: "INFO" | "ERROR" | "WARNING";
    icon?: string;
    color?: string;
    message?: string;
    connectedCallback(): void;
    updated(changedProperties: any): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    info(message: string): Promise<void>;
    error(message: string): Promise<void>;
    warning(message: string): Promise<void>;
    show(message: string): Promise<void>;
    close(): Promise<void>;
    private startHideAsync;
    cancelHideAsync(): Promise<void>;
    private toggleMessageExpand;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=ToastBar.d.ts.map