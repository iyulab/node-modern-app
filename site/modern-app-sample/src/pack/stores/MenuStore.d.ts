interface Seperator {
    type: "separator";
    line?: boolean;
    height?: number;
}
interface SingleMenu {
    type: "single";
    key: string;
    display: string;
    path?: string;
    iconViewBox?: string;
    iconData?: string;
}
export interface GroupMenu {
    type: "group";
    display: string;
    iconViewBox?: string;
    iconData?: string;
    subMenu: SubMenu[];
}
export interface SubMenu {
    key: string;
    display: string;
    path?: string;
    force?: boolean;
}
interface ActionMenu {
    type: "action";
    action: () => void;
    display: string;
    iconViewBox?: string;
    iconData?: string;
}
export type MenuItem = Seperator | SingleMenu | GroupMenu | ActionMenu;
export declare class MenuStore {
    private menuItems;
    get menus(): MenuItem[];
    constructor();
    initMenu(items: MenuItem[], keyPath: Map<string, string>): void;
    resolvePath(item: MenuItem[], keyPath: Map<string, string>): MenuItem[];
}
export {};
//# sourceMappingURL=MenuStore.d.ts.map