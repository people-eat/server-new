import { type PhoneNumberUpdate } from '../../core/phone-number-update';
import { type NanoId } from '../../core/shared';

export interface DBPhoneNumberUpdate extends PhoneNumberUpdate {
    secret: NanoId;
}
