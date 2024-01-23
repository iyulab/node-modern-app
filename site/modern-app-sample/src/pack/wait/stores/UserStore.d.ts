export interface IUser {
    claims: {
        type: string;
        value: string;
    }[];
}
export declare class UserStore {
    user?: IUser | null;
    get userId(): string | undefined;
    get userName(): string | undefined;
    get userEmail(): string | undefined;
    get userRoles(): string[] | undefined;
    get SID(): string | undefined;
    get userClaims(): {
        type: string;
        value: string;
    }[] | undefined;
    constructor();
    login(user: IUser): void;
    init(): void;
}
export declare const userStore: UserStore;
//# sourceMappingURL=UserStore.d.ts.map