export interface EmailAdapter {
    send(sender: string, recipients: string[], subject: string, message: string): Promise<boolean>;
}
