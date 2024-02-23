import { DI } from '../core/DI';
import { 
    LayoutStore,
    LocatorStore,
    UIStore
} from '../stores';

function useLayout() {
    const layout = DI.get(LayoutStore);
    return layout;
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
    useLocator, 
    useUI 
};