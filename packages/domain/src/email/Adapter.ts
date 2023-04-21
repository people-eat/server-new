export interface Adapter {
    sendToOne(sender: string, recipient: string, subject: string, message: string): Promise<boolean>;
    sendToMany(sender: string, recipients: string[], subject: string, message: string): Promise<boolean>;
}
