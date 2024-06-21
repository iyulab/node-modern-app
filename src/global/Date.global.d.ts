declare global {
    interface Date {
        format(format: string): string;
    }
}

export {};
