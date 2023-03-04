import { Database, Email, IdentityProvider, Logger, Payment, SMS } from '../index.js';
import { createAddressService } from './address/createAddressService.js';
import { createAdminService } from './admin/createAdminService.js';
import { createAllergyService } from './allergy/createAllergyService.js';
import { createBookingRequestAllergyService } from './booking-request-allergy/createBookingRequestService.js';
import { createBookingRequestService } from './booking-request/createBookingRequestService.js';
import { createCategoryService } from './category/createCategoryService.js';
import { createChatMessageService } from './chat-message/createChatMessageService.js';
import { createConfiguredMenuService } from './configured-menu/createConfiguredMenuService.js';
import { createCookLanguageService } from './cook-language/createCookLanguageService.js';
import { createCookRatingService } from './cook-rating/createCookRatingService.js';
import { createCookSpecificFeeService } from './cook-specific-fee/createCookSpecificFeeService.js';
import { createCookVisitService } from './cook-visit/createCookVisitService.js';
import { createCookService } from './cook/createCookService.js';
import { createCourseService } from './course/createCourseService.js';
import { createCustomerFeeUpdateService } from './customer-fee-update/createCustomerFeeUpdateService.js';
import { createEmailAddressUpdateService } from './email-address-update/createEmailAddressUpdateService.js';
import { createFavoriteCookService } from './favorite-cook/createFavoriteCookService.js';
import { createGlobalBookingRequestService } from './global-booking-request/createGlobalBookingRequestService.js';
import { createKitchenService } from './kitchen/createKitchenService.js';
import { createLanguageService } from './language/createLanguageService.js';
import { createMealOptionService } from './meal-option/createMealOptionService.js';
import { createMealVisitService } from './meal-visit/createMealVisitService.js';
import { createMealService } from './meal/createMealService.js';
import { createMenuCategoryService } from './menu-category/createMenuCategoryService.js';
import { createMenuVisitService } from './menu-visit/createMenuVisitService.js';
import { createMenuService } from './menu/createMenuService.js';
import { createNotificationConfigurationService } from './notification-configuration/createNotificationConfigurationService.js';
import { createNotificationService } from './notification/createNotificationService.js';
import { createOneTimeAccessTokenService } from './one-time-access-token/createOneTimeAccessTokenService.js';
import { createPhoneNumberUpdateService } from './phone-number-update/createPhoneNumberUpdateService.js';
import { createPrivacyPolicyUpdateService } from './privacy-policy-update/createPrivacyPolicyUpdateService.js';
import { createPublicCookService } from './public-cook/createPublicCookService.js';
import { createPublicMenuService } from './public-menu/createPublicMenuService.js';
import { createPublicPrivacyPolicyUpdateService } from './public-privacy-policy-update/createPublicPrivacyPolicyUpdateService.js';
import { createPublicTermsUpdateService } from './public-terms-update/createPublicTermsUpdateService.js';
import { createPublicUserService } from './public-user/createPublicUserService.js';
import { createSearchRequestService } from './search-request/createSearchRequestService.js';
import { Service } from './Service.js';
import { createSessionService } from './session/createSessionService.js';
import { createTermsUpdateService } from './terms-update/createTermsUpdateService.js';
import { createUserRatingService } from './user-rating/createUserRatingService.js';
import { createUserService } from './user/createUserService.js';

export interface CreateServiceInput {
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.EmailAdapter;
    emailRendererAdapter: Email.EmailRendererAdapter;
    smsAdapter: SMS.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
    paymentAdapter: Payment.PaymentProviderAdapter;
}

export function createService({
    databaseAdapter,
    logger,
    emailAdapter,
    emailRendererAdapter,
    smsAdapter,
    identityProviderAdapter,
    paymentAdapter,
}: CreateServiceInput): Service {
    return {
        address: createAddressService({ databaseAdapter, logger }),
        admin: createAdminService({ databaseAdapter, logger }),
        allergy: createAllergyService({ databaseAdapter, logger }),
        bookingRequest: createBookingRequestService({ databaseAdapter, logger, paymentAdapter }),
        bookingRequestAllergy: createBookingRequestAllergyService({ databaseAdapter, logger }),
        chatMessage: createChatMessageService({ databaseAdapter, logger }),
        category: createCategoryService({ databaseAdapter, logger }),
        cook: createCookService({ databaseAdapter, logger }),
        cookLanguage: createCookLanguageService({ databaseAdapter, logger }),
        cookRating: createCookRatingService({ databaseAdapter, logger }),
        cookSpecificFee: createCookSpecificFeeService({ databaseAdapter, logger }),
        cookVisit: createCookVisitService({ databaseAdapter, logger }),
        course: createCourseService({ databaseAdapter, logger }),
        configuredMenu: createConfiguredMenuService({ databaseAdapter, logger }),
        customerFeeUpdate: createCustomerFeeUpdateService({ databaseAdapter, logger }),
        emailAddressUpdate: createEmailAddressUpdateService({ databaseAdapter, logger, emailAdapter, emailRendererAdapter }),
        favoriteCook: createFavoriteCookService({ databaseAdapter, logger }),
        globalBookingRequest: createGlobalBookingRequestService({ databaseAdapter, logger }),
        kitchen: createKitchenService({ databaseAdapter, logger }),
        language: createLanguageService({ databaseAdapter, logger }),
        menu: createMenuService({ databaseAdapter, logger }),
        menuCategory: createMenuCategoryService({ databaseAdapter, logger }),
        menuVisit: createMenuVisitService({ databaseAdapter, logger }),
        meal: createMealService({ databaseAdapter, logger }),
        mealOption: createMealOptionService({ databaseAdapter, logger }),
        mealVisit: createMealVisitService({ databaseAdapter, logger }),
        notification: createNotificationService({ databaseAdapter, logger }),
        notificationConfiguration: createNotificationConfigurationService({ databaseAdapter, logger }),
        oneTimeAccessToken: createOneTimeAccessTokenService({ databaseAdapter, logger }),
        phoneNumberUpdate: createPhoneNumberUpdateService({ databaseAdapter, logger, smsAdapter }),
        privacyPolicyUpdate: createPrivacyPolicyUpdateService({ databaseAdapter, logger }),
        publicCook: createPublicCookService({ databaseAdapter, logger }),
        publicMenu: createPublicMenuService({ databaseAdapter, logger }),
        publicPrivacyPolicyUpdate: createPublicPrivacyPolicyUpdateService({ databaseAdapter, logger }),
        publicTermsUpdate: createPublicTermsUpdateService({ databaseAdapter, logger }),
        publicUser: createPublicUserService({ databaseAdapter, logger }),
        session: createSessionService({ databaseAdapter, logger, identityProviderAdapter }),
        searchRequest: createSearchRequestService({ databaseAdapter, logger }),
        termsUpdate: createTermsUpdateService({ databaseAdapter, logger }),
        user: createUserService({ databaseAdapter, logger, emailAdapter, emailRendererAdapter, smsAdapter, identityProviderAdapter }),
        userRating: createUserRatingService({ databaseAdapter, logger }),
    };
}
