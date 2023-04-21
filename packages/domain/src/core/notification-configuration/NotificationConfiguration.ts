import { type NanoId } from '../shared';

export interface NotificationConfiguration {
    userId: NanoId;

    // Push Notifications
    pushesForBookingRequests: boolean;
    pushesForFavoriteCooks: boolean;
    pushesForOffers: boolean;
    pushesForAccount: boolean;

    // E-Mail Notifications
    emailsForBookingRequests: boolean;
    emailsForFavoriteCooks: boolean;
    emailsForOffers: boolean;
    emailsForAccount: boolean;
}
