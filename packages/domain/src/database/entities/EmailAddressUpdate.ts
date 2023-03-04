import type { EmailAddressUpdate } from '../../core/email-address-update';

export interface DBEmailAddressUpdate extends EmailAddressUpdate {
    secret: string;
}
