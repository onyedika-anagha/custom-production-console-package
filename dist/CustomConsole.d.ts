export declare class CustomConsole {
    private production;
    private errorEndpoint;
    constructor(errorEndpoint?: string);
    log(...args: any[]): void;
    error(...args: any[]): void;
    private sendToServer;
}
