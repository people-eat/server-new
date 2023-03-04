export interface NotificationConfiguration {
    userId: string;

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
