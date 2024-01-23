import { FlyoutElement, Position } from './FlyoutElement';
export interface Notification {
    id: number;
    title: string;
    content: string;
    date?: Date;
    read: boolean;
}
export declare class NotificationMenu extends FlyoutElement {
    keepHover: boolean;
    position: Position;
    items: Notification[];
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private getUserInfo;
    private readItem;
    private deleteItem;
    private deleteAll;
    private deleteRead;
    private formatDate;
    private formatDateToFullDate;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=NotificationMenu.d.ts.map