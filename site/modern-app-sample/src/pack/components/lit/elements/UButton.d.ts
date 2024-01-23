import { LitElement } from 'lit';
import { RelayCommand } from '@iyulab/modern-app/services/patterns/RelayCommand';
import { ICommand } from '@iyulab/modern-app/services/patterns/ICommand';
declare const UButton_base: (new (...args: any[]) => import("@iyulab/modern-app/core/ElementMixin").IElement) & typeof LitElement;
export declare class UButton extends UButton_base {
    static styles: import("lit").CSSResult[];
    href: string | null;
    appearance: string | null;
    accent: boolean;
    disabled: boolean;
    command: ICommand | undefined;
    commandParameter?: any;
    onChangedCommand(command?: RelayCommand): void;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    onClick(): void;
}
export {};
//# sourceMappingURL=UButton.d.ts.map