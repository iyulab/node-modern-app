import type { GroupMenu } from '@iyulab/modern-app/stores/MenuStore';
import { LocatorStore } from '@iyulab/modern-app/stores/LocatorStore';
import { FlyoutElement, Position } from './FlyoutElement';
export declare class SubNavMenu extends FlyoutElement {
    keepHover: boolean;
    position: Position;
    locator: LocatorStore;
    key?: string;
    item?: GroupMenu;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private handleChangeLocation;
    static styles: import("lit").CSSResult;
}
//# sourceMappingURL=SubNavMenu.d.ts.map