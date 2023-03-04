import type { EmailAddressUpdate } from '../../core/email-address-update/index.js';

export interface DBEmailAddressUpdate extends EmailAddressUpdate {
    secret: string;
}
