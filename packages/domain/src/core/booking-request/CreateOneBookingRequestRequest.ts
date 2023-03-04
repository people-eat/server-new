import { ConfiguredMenu } from '../configured-menu/ConfiguredMenu.js';
import { Location, PaymentProvider, Price } from '../shared.js';

export interface CreateOneBookingRequestRequest {
    cookId: string;
    adultParticipants: number;
    children: number;
    location: Location;
    configuredMenu: ConfiguredMenu;
    price?: Price;
    dateTime: Date;
    paymentProvider: PaymentProvider;
    occasion: string;
    duration: number;
}
