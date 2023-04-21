import { type Platform } from '../core/shared';

export interface SendPushNotificationOptions {
    pushToken: string;
    title: string;
    subTitle: string;
    body: string;
}

export type Adapter = Record<Platform, (options: SendPushNotificationOptions) => Promise<boolean>>;
