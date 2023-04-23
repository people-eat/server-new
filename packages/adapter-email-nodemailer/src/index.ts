import { type Email, type Logger } from '@people-eat/server-domain';
import { createTransport, type Transporter } from 'nodemailer';

export interface CreateEmailAdapterInput {
    logger: Logger.Adapter;
    emailAddress: string;
    password: string;
}

export function createEmailAdapter({ logger, emailAddress, password }: CreateEmailAdapterInput): Email.Adapter {
    const transporter: Transporter = createTransport({
        auth: {
            pass: password,
            user: emailAddress,
        },
        host: 'smtp.gmail.com',
        service: 'gmail',
    });

    const sendToMany = async (sender: string, recipients: string[], subject: string, message: string): Promise<boolean> => {
        try {
            await transporter.sendMail({
                from: `"${sender}" <${emailAddress}>`,
                html: message,
                subject: subject,
                to: recipients,
            });
            return true;
        } catch (error) {
            logger.error(error);
            return false;
        }
    };

    const sendToOne = async (sender: string, recipient: string, subject: string, message: string): Promise<boolean> => {
        const success: boolean = await sendToMany(sender, [recipient], subject, message);
        return success;
    };

    return { sendToMany, sendToOne };
}
