import { randomUUID } from 'crypto';
import { type EventsApi, type ProfilesApi } from 'klaviyo-api';
import { type Logger, type User } from '../../domain/src';
import { getKlaviyoProfileIdForUser } from './getKlaviyoProfileIdForUser';

type Recipient = Pick<User, 'userId' | 'firstName' | 'lastName' | 'emailAddress' | 'phoneNumber'>;

export interface SendToUserOptions {
    logger: Logger.Adapter;
    profiles: ProfilesApi;
    events: EventsApi;
    recipient: Recipient;
    metricId: string;
    data: object;
}

export async function sendToUser({ logger, profiles, events, recipient, metricId, data }: SendToUserOptions): Promise<void> {
    const klaviyoProfileId: string = await getKlaviyoProfileIdForUser({ logger, profiles, user: recipient });

    await events.createEvent({
        data: {
            type: 'event',
            attributes: {
                // check if this can be removed
                uniqueId: randomUUID(),
                properties: data,
                profile: { data: { type: 'profile', id: klaviyoProfileId, attributes: {} } },
                metric: { data: { type: 'metric', attributes: { name: metricId } } },
            },
        },
    });
}
