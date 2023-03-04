export interface Adapter {
    send: (recipient: string, message: string) => Promise<boolean>;
}
