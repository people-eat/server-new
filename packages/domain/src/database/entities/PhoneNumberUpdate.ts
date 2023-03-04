import type { PhoneNumberUpdate } from '../../core/phone-number-update/index.js';

export interface DBPhoneNumberUpdate extends PhoneNumberUpdate {
    secret: string;
}
