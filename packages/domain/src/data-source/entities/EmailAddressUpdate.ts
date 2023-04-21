import { type EmailAddressUpdate } from '../../core/email-address-update';
import { type NanoId } from '../../core/shared';

export interface DBEmailAddressUpdate extends EmailAddressUpdate {
    secret: NanoId;
}
