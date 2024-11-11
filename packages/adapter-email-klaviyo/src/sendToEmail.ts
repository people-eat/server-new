import { randomUUID } from 'crypto';
import { type EventsApi, type ProfilesApi } from 'klaviyo-api';
import { type Logger } from '../../domain/src';
import { getKlaviyoProfileIdForEmail } from './getKlaviyoProfileIdForEmail';

export interface SendToEmailOptions {
    logger: Logger.Adapter;
    profiles: ProfilesApi;
    events: EventsApi;
    email: string;
    metricId: string;
    data: object;
}

export async function sendToEmail({ logger, profiles, events, email, metricId, data }: SendToEmailOptions): Promise<void> {
    const klaviyoProfileId: string = await getKlaviyoProfileIdForEmail({ logger, profiles, email });

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
