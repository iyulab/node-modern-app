export interface AppSettings {
    getServiceURL(): string | null;
    getAccessToken(): string | null;
    get<T>(key: string): T;
    set<T>(key: string, value: T): void;
}
export declare const AppSettings: symbol;
export declare abstract class AppSettingsBase implements AppSettings {
    private settings;
    getServiceURL(): string | null;
    getAccessToken(): string | null;
    get<T>(key: string): T;
    set<T>(key: string, value: T): void;
}
//# sourceMappingURL=AppSettings.d.ts.map