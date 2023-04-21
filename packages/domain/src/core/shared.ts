export type NanoId = string;

export type Gender = 'DIVERSE' | 'FEMALE' | 'MALE' | 'NO_INFORMATION';

export type Platform = 'IOS' | 'ANDROID' | 'BROWSER' | 'NO_INFORMATION';

export type UserLanguage = 'GERMAN' | 'ENGLISH';

export type IdentityProvider = 'APPLE' | 'GOOGLE';

export type CookRank = 'HOBBY' | 'PROFESSIONAL';

export type MealType = 'SOUP' | 'MEAT' | 'FISH' | 'VEGETARIAN' | 'VEGAN' | 'DESSERT' | 'SPECIAL';

export interface Location {
    latitude: number;
    longitude: number;
    text?: string;
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
