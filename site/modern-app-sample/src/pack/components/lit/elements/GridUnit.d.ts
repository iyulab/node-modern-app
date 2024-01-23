import { LitElement } from "lit";
import './XSplitter';
export declare class GridUnit extends LitElement {
    key?: string;
    orientation: "horizontal" | "vertical";
    init: string;
    item1: HTMLElement;
    item2: HTMLElement;
    static styles: import("lit").CSSResult;
    firstUpdated(_changedProperties: any): Promise<void>;
    updated(changedProperties: any): void;
    render(): import("lit-html").TemplateResult<1>;
    onDragged(e: CustomEvent): void;
    resize(v: number): void;
    save(): void;
    load(): void;
}
//# sourceMappingURL=GridUnit.d.ts.map