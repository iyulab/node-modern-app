export declare enum Breakpoint {
    Tablet = 768,
    Small = 1100,
    Medium = 1300,
    Large = 1500
}
export declare enum Themes {
    dark = 0,
    light = 1
}
export declare class LayoutStore {
    private _title?;
    private _logo?;
    private _theme;
    private _isMediumScreen;
    get title(): string | undefined;
    get logo(): any;
    get theme(): Themes;
    get isMediumScreen(): boolean;
    constructor();
    initLayout(title?: string, logo?: any): void;
    toggleTheme(targetElement?: any): void;
    private updateTheme;
    private onWindowResized;
}
//# sourceMappingURL=LayoutStore.d.ts.map