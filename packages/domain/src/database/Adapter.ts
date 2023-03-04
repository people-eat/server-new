import type { DatabaseRepository } from './DatabaseRepository.js';
import type { DBCook } from './entities/Cook.js';
import type { DBEmailAddressUpdate } from './entities/EmailAddressUpdate.js';
import type { DBGlobalBookingRequest } from './entities/GlobalBookingRequest.js';
import type { DBOneTimeAccessToken } from './entities/OneTimeAccessToken.js';
import type { DBPhoneNumberUpdate } from './entities/PhoneNumberUpdate.js';
import type {
    DBAllergy,
    DBBookingRequestAllergy,
    DBCategory,
    DBChatMessage,
    DBConfiguredMenu,
    DBCookLanguage,
    DBCookRating,
    DBCookSpecificFee,
    DBCookVisit,
    DBCourse,
    DBCustomerFeeUpdate,
    DBFavoriteCook,
    DBKitchen,
    DBLanguage,
    DBMeal,
    DBMealOption,
    DBMealVisit,
    DBMenu,
    DBMenuCategory,
    DBMenuVisit,
    DBNotification,
    DBPrivacyPolicyUpdate,
    DBTermsUpdate,
    DBUserRating,
} from './entities/unchanged.js';
import type { DBUser } from './entities/User.js';
import type { DBAddress, DBAdmin, DBBookingRequest, DBNotificationConfiguration, DBSearchRequest, DBSession } from './index.js';

export interface Adapter {
    userRepository: DatabaseRepository<DBUser>;
    oneTimeAccessTokenRepository: DatabaseRepository<DBOneTimeAccessToken>;
    emailAddressUpdateRepository: DatabaseRepository<DBEmailAddressUpdate>;
    phoneNumberUpdateRepository: DatabaseRepository<DBPhoneNumberUpdate>;
    addressRepository: DatabaseRepository<DBAddress>;
    notificationRepository: DatabaseRepository<DBNotification>;
    notificationConfigurationRepository: DatabaseRepository<DBNotificationConfiguration>;

    sessionRepository: DatabaseRepository<DBSession>;
    cookVisitRepository: DatabaseRepository<DBCookVisit>;
    mealVisitRepository: DatabaseRepository<DBMealVisit>;
    menuVisitRepository: DatabaseRepository<DBMenuVisit>;

    adminRepository: DatabaseRepository<DBAdmin>;
    privacyPolicyUpdateRepository: DatabaseRepository<DBPrivacyPolicyUpdate>;
    termsUpdateRepository: DatabaseRepository<DBTermsUpdate>;
    cookSpecificFeeRepository: DatabaseRepository<DBCookSpecificFee>;
    customerFeeUpdateRepository: DatabaseRepository<DBCustomerFeeUpdate>;
    searchRequestRepository: DatabaseRepository<DBSearchRequest>;

    cookRepository: DatabaseRepository<DBCook>;
    languageRepository: DatabaseRepository<DBLanguage>;
    cookLanguageRepository: DatabaseRepository<DBCookLanguage>;
    favoriteCookRepository: DatabaseRepository<DBFavoriteCook>;

    mealRepository: DatabaseRepository<DBMeal>;
    menuRepository: DatabaseRepository<DBMenu>;
    courseRepository: DatabaseRepository<DBCourse>;
    mealOptionRepository: DatabaseRepository<DBMealOption>;
    kitchenRepository: DatabaseRepository<DBKitchen>;
    categoryRepository: DatabaseRepository<DBCategory>;
    menuCategoryRepository: DatabaseRepository<DBMenuCategory>;

    globalBookingRequestRepository: DatabaseRepository<DBGlobalBookingRequest>;
    bookingRequestRepository: DatabaseRepository<DBBookingRequest>;
    allergyRepository: DatabaseRepository<DBAllergy>;
    bookingRequestAllergyRepository: DatabaseRepository<DBBookingRequestAllergy>;
    chatMessageRepository: DatabaseRepository<DBChatMessage>;
    configuredMenuRepository: DatabaseRepository<DBConfiguredMenu>;

    cookRatingRepository: DatabaseRepository<DBCookRating>;
    userRatingRepository: DatabaseRepository<DBUserRating>;
}
