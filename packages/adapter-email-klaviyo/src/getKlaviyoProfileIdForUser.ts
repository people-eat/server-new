import { type Logger, type User } from '@people-eat/server-domain';
import { type ProfilesApi } from 'klaviyo-api';

export interface GetKlaviyoProfileIdForUserOptions {
    logger: Logger.Adapter;
    profiles: ProfilesApi;
    user: Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>;
}

export async function getKlaviyoProfileIdForUser({ logger, profiles, user }: GetKlaviyoProfileIdForUserOptions): Promise<string> {
    const { body: getResponseBody } = await profiles.getProfiles({ filter: `equals(external_id,"${user.userId}")` });
    const [existingProfileByExternalId] = getResponseBody.data;

    if (!existingProfileByExternalId) {
        logger.info(`Requested Klaviyo profile for PeopleEat user with id '${user.userId}' and did not receive one.`);

        const { body: getResponseBodyByEmail } = await profiles.getProfiles({ filter: `equals(email,"${user.emailAddress}")` });
        const [existingProfileByEmail] = getResponseBodyByEmail.data;

        if (existingProfileByEmail && existingProfileByEmail.id) {
            logger.info(
                `Requested Klaviyo profile for PeopleEat user with email address '${
                    user.emailAddress
                }' and did receive one:\n${JSON.stringify(existingProfileByEmail)}`,
            );
            await profiles.updateProfile(existingProfileByEmail.id, {
                data: {
                    id: existingProfileByEmail.id,
                    type: 'profile',
                    attributes: {
                        externalId: user.userId,
                        // first name and last name important for the case that someone first signed up for a newsletter
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                },
            });
            logger.info(
                `Updated external id of Klaviyo profile with email address '${user.emailAddress}' from ${existingProfileByEmail.id} to ${user.userId}}`,
            );
            return existingProfileByEmail.id;
        }

        try {
            const { body: createResponseBody } = await profiles.createProfile({
                data: {
                    type: 'profile',
                    attributes: {
                        externalId: user.userId,
                        email: user.emailAddress,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                },
            });

            logger.info(`Created Klaviyo profile for PeopleEat user with id '${user.userId}'\n${JSON.stringify(createResponseBody.data)}`);

            return createResponseBody.data.id ?? '';
        } catch (error) {
            logger.error(error);
            logger.error(`Could not create Klaviyo profile for user data \n${JSON.stringify(user)}`);
            return '';
        }
    }

    logger.info(
        `Requested Klaviyo profile for PeopleEat user with id '${user.userId}' and did receive one:\n${JSON.stringify(
            existingProfileByExternalId,
        )}`,
    );

    return existingProfileByExternalId.id ?? '';
}
