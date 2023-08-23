import { type DataSource, type Email, type IdentityProvider, type Logger, type PaymentProvider, type SMS } from '..';
import { createAddressService } from './address/createAddressService';
import { createAdminService } from './admin/createAdminService';
import { createAllergyService } from './allergy/createAllergyService';
import { createBookingRequestService } from './booking-request/createBookingRequestService';
import { createCategoryService } from './category/createCategoryService';
import { createChatMessageService } from './chat-message/createChatMessageService';
import { createConfiguredMenuService } from './configured-menu/createConfiguredMenuService';
import { createCookLanguageService } from './cook-language/createCookLanguageService';
import { createCookService } from './cook/createCookService';
import { createCourseService } from './course/createCourseService';
import { createEmailAddressUpdateService } from './email-address-update/createEmailAddressUpdateService';
import { createFavoriteCookService } from './favorite-cook/createFavoriteCookService';
import { createGlobalBookingRequestService } from './global-booking-request/createGlobalBookingRequestService';
import { createKitchenService } from './kitchen/createKitchenService';
import { createLanguageService } from './language/createLanguageService';
import { createLogService } from './log/createLogService';
import { createMealOptionService } from './meal-option/createMealOptionService';
import { createMealService } from './meal/createMealService';
import { createMenuCategoryService } from './menu-category/createMenuCategoryService';
import { createMenuService } from './menu/createMenuService';
import { createPhoneNumberUpdateService } from './phone-number-update/createPhoneNumberUpdateService';
import { createPublicCookService } from './public-cook/createPublicCookService';
import { createPublicMenuService } from './public-menu/createPublicMenuService';
import { createPublicPrivacyPolicyUpdateService } from './public-privacy-policy-update/createPublicPrivacyPolicyUpdateService';
import { createPublicTermsUpdateService } from './public-terms-update/createPublicTermsUpdateService';
import { createPublicUserService } from './public-user/createPublicUserService';
import { type Service } from './Service';
import { createSessionService } from './session/createSessionService';
import { createUserService } from './user/createUserService';

export interface CreateServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    smsAdapter: SMS.Adapter;
    identityProviderAdapter: IdentityProvider.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    serverUrl: string;
    webAppUrl: string;
}

export function createService({
    dataSourceAdapter,
    logger,
    emailAdapter,
    smsAdapter,
    identityProviderAdapter,
    paymentAdapter,
    serverUrl,
    webAppUrl,
}: CreateServiceInput): Service {
    return {
        log: createLogService({ dataSourceAdapter }),

        language: createLanguageService({ dataSourceAdapter, logger }),
        category: createCategoryService({ dataSourceAdapter, logger }),
        kitchen: createKitchenService({ dataSourceAdapter, logger }),
        allergy: createAllergyService({ dataSourceAdapter, logger }),
        user: createUserService({ dataSourceAdapter, logger, emailAdapter, smsAdapter, identityProviderAdapter, serverUrl, webAppUrl }),
        session: createSessionService({ dataSourceAdapter, logger, identityProviderAdapter }),
        admin: createAdminService({ dataSourceAdapter, logger }),
        publicTermsUpdates: createPublicTermsUpdateService({ dataSourceAdapter, logger }),
        publicPrivacyPolicyUpdates: createPublicPrivacyPolicyUpdateService({ dataSourceAdapter, logger }),
        emailAddressUpdate: createEmailAddressUpdateService({ dataSourceAdapter, logger, emailAdapter, webAppUrl }),
        phoneNumberUpdate: createPhoneNumberUpdateService({ dataSourceAdapter, logger, smsAdapter, webAppUrl }),
        address: createAddressService({ dataSourceAdapter, logger }),
        cook: createCookService({ dataSourceAdapter, logger, smsAdapter, emailAdapter }),
        publicUser: createPublicUserService({ dataSourceAdapter, logger }),
        publicCook: createPublicCookService({ dataSourceAdapter, logger }),
        publicMenu: createPublicMenuService({ dataSourceAdapter, logger }),
        meal: createMealService({ dataSourceAdapter, logger, serverUrl }),
        menu: createMenuService({ dataSourceAdapter, logger }),
        menuCategory: createMenuCategoryService({ dataSourceAdapter, logger }),
        cookLanguage: createCookLanguageService({ dataSourceAdapter, logger }),
        course: createCourseService({ dataSourceAdapter, logger }),
        mealOption: createMealOptionService({ dataSourceAdapter, logger }),
        globalBookingRequest: createGlobalBookingRequestService({ dataSourceAdapter, logger, emailAdapter }),
        bookingRequest: createBookingRequestService({ dataSourceAdapter, paymentAdapter, logger, emailAdapter }),
        chatMessage: createChatMessageService({ dataSourceAdapter, logger }),
        configuredMenu: createConfiguredMenuService({ dataSourceAdapter, logger }),
        favoriteCook: createFavoriteCookService({ dataSourceAdapter, logger }),
    };
}
