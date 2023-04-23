import { type Logger, type SMS } from '@people-eat/server-domain';
import twilio from 'twilio';
import { type MessageInstance } from 'twilio/lib/rest/api/v2010/account/message.js';

export interface CreateSMSAdapterInput {
    logger: Logger.Adapter;
    accountSid: string;
    authToken: string;
    twilioPhoneNumber: string;
}

export function createSMSAdapter({ logger, accountSid, authToken, twilioPhoneNumber }: CreateSMSAdapterInput): SMS.Adapter {
    const client: twilio.Twilio = new twilio.Twilio(accountSid, authToken, {});

    const sendToOne = async (recipient: string, message: string): Promise<boolean> => {
        try {
            const result: MessageInstance = await client.messages.create({
                body: message,
                from: twilioPhoneNumber,
                to: recipient,
            });
            return !result.errorCode;
        } catch (error) {
            logger.error(error);
            return false;
        }
    };

    const sendToMany = async (recipients: string[], message: string): Promise<boolean> => {
        for (const recipient of recipients) await sendToOne(recipient, message);
        return true;
    };

    return { sendToMany, sendToOne };
}
