import { Gender, UserLanguage } from '../shared.js';

export interface User {
    userId: string;
    emailAddress?: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    language: UserLanguage;
    gender: Gender;
    birthDate?: string;
    profilePictureUrl?: string;
    acceptedPrivacyPolicy: Date;
    acceptedTerms: Date;
    createdAt: Date;
}
