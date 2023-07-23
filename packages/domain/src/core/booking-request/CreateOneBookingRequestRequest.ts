import { type CreateOneConfiguredMenuRequest } from '../configured-menu';
import { type Location, type NanoId, type Price } from '../shared';

export interface CreateOneBookingRequestRequest {
    cookId: NanoId;
    location: Location;
    dateTime: Date;
    preparationTime: number;
    duration: number;
    adultParticipants: number;
    children: number;
    price: Price;
    occasion: string;
    message: string;
    kitchenId?: NanoId;
    configuredMenu?: CreateOneConfiguredMenuRequest;
}
