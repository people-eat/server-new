import { Email, Logger } from '@people-eat/server-domain';
import { createTransport, Transporter } from 'nodemailer';

export interface CreateEmailAdapterInput {
    logger: Logger.Adapter;
    emailAddress: string;
    password: string;
}

export function createEmailAdapter({ logger, emailAddress, password }: CreateEmailAdapterInput): Email.EmailAdapter {
    const transporter: Transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: emailAddress,
            pass: password,
        },
    });

    return {
        send: async (sender: string, recipients: string[], subject: string, message: string): Promise<boolean> => {
            try {
                await transporter.sendMail({
                    from: `"${sender}" <${emailAddress}>`,
                    to: recipients,
                    subject: subject,
                    html: message,
                });
                return true;
            } catch (error) {
                logger.error(error);
                return false;
            }
        },
    };
}
