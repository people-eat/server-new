import { Database } from '../../index.js';
import { User } from './User.js';

export default function toUser(dbUser: Database.DBUser): User {
    return {
        userId: dbUser.userId,
        emailAddress: dbUser.emailAddress,
        phoneNumber: dbUser.phoneNumber,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        language: dbUser.language,
        gender: dbUser.gender,
        birthDate: dbUser.birthDate,
        profilePictureUrl: dbUser.profilePictureUrl,
        acceptedPrivacyPolicy: dbUser.acceptedPrivacyPolicy,
        acceptedTerms: dbUser.acceptedTerms,
        createdAt: dbUser.createdAt,
    };
}
