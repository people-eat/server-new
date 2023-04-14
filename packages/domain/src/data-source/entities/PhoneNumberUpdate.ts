import { type PhoneNumberUpdate } from '../../core/phone-number-update';

export interface DBPhoneNumberUpdate extends PhoneNumberUpdate {
    secret: string;
}
