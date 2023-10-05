import { type AddressService } from './address/createAddressService';
import { type AdminService } from './admin/createAdminService';
import { type AllergyService } from './allergy/createAllergyService';
import { type BookingRequestService } from './booking-request/createBookingRequestService';
import { type CategoryService } from './category/createCategoryService';
import { type ChatMessageService } from './chat-message/createChatMessageService';
import { type ConfiguredMenuService } from './configured-menu/createConfiguredMenuService';
import { type CookLanguageService } from './cook-language/createCookLanguageService';
import { type CookService } from './cook/createCookService';
import { type CourseService } from './course/createCourseService';
import { type EmailAddressUpdateService } from './email-address-update/createEmailAddressUpdateService';
import { type FavoriteCookService } from './favorite-cook/createFavoriteCookService';
import { type GlobalBookingRequestService } from './global-booking-request/createGlobalBookingRequestService';
import { type KitchenService } from './kitchen/createKitchenService';
import { type LanguageService } from './language/createLanguageService';
import { type LogService } from './log/createLogService';
import { type MealOptionService } from './meal-option/createMealOptionService';
import { type MealService } from './meal/createMealService';
import { type MenuCategoryService } from './menu-category/createMenuCategoryService';
import { type MenuService } from './menu/createMenuService';
import { type OneTimeAccessTokenService } from './one-time-access-token/createOneTimeAccessTokenService';
import { type PhoneNumberUpdateService } from './phone-number-update/createPhoneNumberUpdateService';
import { type PublicCookService } from './public-cook/createPublicCookService';
import { type PublicMenuService } from './public-menu/createPublicMenuService';
import { type PublicPrivacyPolicyUpdateService } from './public-privacy-policy-update/createPublicPrivacyPolicyUpdateService';
import { type PublicTermsUpdateService } from './public-terms-update/createPublicTermsUpdateService';
import { type PublicUserService } from './public-user/createPublicUserService';
import { type SessionService } from './session/createSessionService';
import { type UserService } from './user/createUserService';

export interface Publisher {
    publish: (key: string, payload: any) => Promise<void>;
    asyncIterator: (key: string) => AsyncIterator<any>;
}

export interface Service {
    log: LogService;
    publisher: Publisher;

    language: LanguageService;
    category: CategoryService;
    kitchen: KitchenService;
    allergy: AllergyService;
    user: UserService;
    session: SessionService;
    admin: AdminService;
    publicTermsUpdates: PublicTermsUpdateService;
    publicPrivacyPolicyUpdates: PublicPrivacyPolicyUpdateService;
    emailAddressUpdate: EmailAddressUpdateService;
    phoneNumberUpdate: PhoneNumberUpdateService;
    address: AddressService;
    cook: CookService;
    publicUser: PublicUserService;
    publicCook: PublicCookService;
    publicMenu: PublicMenuService;
    meal: MealService;
    menu: MenuService;
    menuCategory: MenuCategoryService;
    cookLanguage: CookLanguageService;
    course: CourseService;
    mealOption: MealOptionService;
    globalBookingRequest: GlobalBookingRequestService;
    bookingRequest: BookingRequestService;
    chatMessage: ChatMessageService;
    configuredMenu: ConfiguredMenuService;
    favoriteCook: FavoriteCookService;
    oneTimeAccessToken: OneTimeAccessTokenService;
}
