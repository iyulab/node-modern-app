import { LitElement } from 'lit';
import { Dialog } from "@microsoft/fast-components";
import { IResultValue } from '@iyulab/modern-app/data/IResultValue';
export interface IDialogContent extends EventTarget {
    title: string;
    loadPromise?: (resolve: (value: IResultValue | PromiseLike<IResultValue>) => void, reject: (reason?: any) => void) => void;
}
export declare class RightDialog extends LitElement {
    static styles: import("lit").CSSResult[];
    dialog?: Dialog;
    title: string;
    content?: IDialogContent;
    resolve?: (value: IResultValue | PromiseLike<IResultValue>) => void;
    reject?: (reason?: any) => void;
    render(): import("lit-html").TemplateResult<1>;
    ok(result?: IResultValue): void;
    cancel(result?: IResultValue): void;
    showAsync(): Promise<IResultValue>;
    private visible;
    private close;
}
//# sourceMappingURL=RightDialog.d.ts.map