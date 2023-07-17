import moment from 'moment';
import { type BookingRequestStatus } from '../../shared';

export interface ToBookingRequestStatusInput {
    // actually not undefined (typeORM returns null, not undefined)
    userAccepted?: boolean | null;
    cookAccepted?: boolean | null;
    dateTime: Date;
}

export function toBookingRequestStatus({ userAccepted, cookAccepted, dateTime }: ToBookingRequestStatusInput): BookingRequestStatus {
    const daysUntilEventStart: number = moment(dateTime).diff(moment(), 'days');

    if (cookAccepted === false || userAccepted === false) return 'CANCELED';
    if ((cookAccepted === null && userAccepted === true) || (cookAccepted === true && userAccepted === null)) return 'OPEN';
    if (cookAccepted === true && userAccepted === true && daysUntilEventStart > 0) return 'PENDING';
    if (cookAccepted === true && userAccepted === true && daysUntilEventStart <= 0) return 'COMPLETED';
    // consider the case expired

    return 'COMPLETED';
}
