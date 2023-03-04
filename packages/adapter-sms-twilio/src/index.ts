import { Logger, SMS } from '@people-eat/server-domain';
import twilio from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

export interface CreateSMSAdapterInput {
    logger: Logger.Adapter;
    accountSid: string;
    authToken: string;
    twilioPhoneNumber: string;
}

export function createSMSAdapter({ logger, accountSid, authToken, twilioPhoneNumber }: CreateSMSAdapterInput): SMS.Adapter {
    const client: any = new twilio.Twilio(accountSid, authToken, {});

    return {
        send: async (recipient: string, message: string): Promise<boolean> => {
            try {
                const result: MessageInstance = await client.messages.create({
                    from: twilioPhoneNumber,
                    to: recipient,
                    body: message,
                });
                return !result.errorCode;
            } catch (error) {
                logger.error(error);
                return false;
            }
        },
    };
}
