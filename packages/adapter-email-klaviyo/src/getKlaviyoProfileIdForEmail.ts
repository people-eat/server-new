import { type Logger } from '@people-eat/server-domain';
import { type ProfilesApi } from 'klaviyo-api';

export interface GetKlaviyoProfileIdForEmailOptions {
    logger: Logger.Adapter;
    profiles: ProfilesApi;
    email: string;
}

export async function getKlaviyoProfileIdForEmail({ logger, profiles, email }: GetKlaviyoProfileIdForEmailOptions): Promise<string> {
    const { body: getResponseBodyByEmail } = await profiles.getProfiles({ filter: `equals(email,"${email}")` });
    const [existingProfileByEmail] = getResponseBodyByEmail.data;

    if (!existingProfileByEmail) {
        try {
            const { body: createResponseBody } = await profiles.createProfile({
                data: {
                    type: 'profile',
                    attributes: {
                        // externalId: '',
                        email,
                        // phoneNumber: '',
                        // firstName: '',
                        // lastName: '',
                    },
                },
            });

            logger.info(`Created Klaviyo profile for email address '${email}'\n${JSON.stringify(createResponseBody.data)}`);

            return createResponseBody.data.id ?? '';
        } catch (error) {
            logger.error(error);
            logger.error(`Could not create Klaviyo profile for email \n${email}`);
            return '';
        }
    }

    return existingProfileByEmail.id ?? '';
}
