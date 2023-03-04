export type Gender = 'DIVERSE' | 'FEMALE' | 'MALE' | 'NO_INFORMATION';

export type Platform = 'IOS' | 'ANDROID' | 'BROWSER' | 'NO_INFORMATION';

export type UserLanguage = 'GERMAN' | 'ENGLISH';

export type IdentityProvider = 'APPLE' | 'GOOGLE';

export type CookRank = 'HOBBY' | 'PROFESSIONAL' | 'MASTER';

export type MealType = 'STARTER' | 'MAIN_COURSE' | 'DESSERT';

export interface Location {
    latitude: number;
    longitude: number;
}

export type PaymentProvider = 'STRIPE';

export type CurrencyCode = 'EUR' | 'USD';

export interface Price {
    amount: number;
    currencyCode: CurrencyCode;
}

export interface FindManyRequest {
    searchText?: string;
    skip?: number;
    take?: number;
}
