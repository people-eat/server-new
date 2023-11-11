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
import { createOneTimeAccessTokenService } from './one-time-access-token/createOneTimeAccessTokenService';
import { createPhoneNumberUpdateService } from './phone-number-update/createPhoneNumberUpdateService';
import { createPublicCookService } from './public-cook/createPublicCookService';
import { createPublicMenuService } from './public-menu/createPublicMenuService';
import { createPublicPrivacyPolicyUpdateService } from './public-privacy-policy-update/createPublicPrivacyPolicyUpdateService';
import { createPublicTermsUpdateService } from './public-terms-update/createPublicTermsUpdateService';
import { createPublicUserService } from './public-user/createPublicUserService';
import { type Runtime } from './Runtime';
import { type Service } from './Service';
import { createSessionService } from './session/createSessionService';
import { createSupportRequestService } from './support-request/createSupportRequestService';
import { createUserService } from './user/createUserService';

export function createService(runtime: Runtime): Service {
    return {
        log: createLogService(runtime),
        publisher: runtime.publisher,

        language: createLanguageService(runtime),
        category: createCategoryService(runtime),
        kitchen: createKitchenService(runtime),
        allergy: createAllergyService(runtime),
        user: createUserService(runtime),
        session: createSessionService(runtime),
        admin: createAdminService(runtime),
        publicTermsUpdates: createPublicTermsUpdateService(runtime),
        publicPrivacyPolicyUpdates: createPublicPrivacyPolicyUpdateService(runtime),
        emailAddressUpdate: createEmailAddressUpdateService(runtime),
        phoneNumberUpdate: createPhoneNumberUpdateService(runtime),
        address: createAddressService(runtime),
        cook: createCookService(runtime),
        publicUser: createPublicUserService(runtime),
        publicCook: createPublicCookService(runtime),
        publicMenu: createPublicMenuService(runtime),
        meal: createMealService(runtime),
        menu: createMenuService(runtime),
        menuCategory: createMenuCategoryService(runtime),
        cookLanguage: createCookLanguageService(runtime),
        course: createCourseService(runtime),
        mealOption: createMealOptionService(runtime),
        globalBookingRequest: createGlobalBookingRequestService(runtime),
        bookingRequest: createBookingRequestService(runtime),
        chatMessage: createChatMessageService(runtime),
        configuredMenu: createConfiguredMenuService(runtime),
        favoriteCook: createFavoriteCookService(runtime),
        oneTimeAccessToken: createOneTimeAccessTokenService(runtime),
        supportRequest: createSupportRequestService(runtime),
    };
}
