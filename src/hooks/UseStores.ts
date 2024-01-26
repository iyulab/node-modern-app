import { DI } from '../core/DI';
import { 
    LayoutStore,
    LocatorStore,
    MenuStore,
    UIStore
} from '../stores';

function useLayout() {
    const layout = DI.get(LayoutStore);
    return layout;
}

function useMenu() {
    const menu = DI.get(MenuStore);
    return menu;
}

function useLocator() {
    const locator = DI.get(LocatorStore);
    return locator;
}

function useUI() {
    const ui = DI.get(UIStore);
    ui.initUI();
    
    return ui;
}

export { 
    useLayout, 
    useMenu, 
    useLocator, 
    useUI 
};