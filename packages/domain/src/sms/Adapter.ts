export interface Adapter {
    sendToOne: (recipient: string, message: string) => Promise<boolean>;
    sendToMany: (recipients: string[], message: string) => Promise<boolean>;
}
