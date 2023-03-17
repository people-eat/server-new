import { Context } from '@people-eat/server-domain/src/authorization';
import { Gender } from '@people-eat/server-domain/src/core/shared.js';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: string;
    DateTime: Date;
    EmailAddress: string;
    Latitude: number;
    Longitude: number;
    PhoneNumber: string;
    UInt: number;
    UUID: string;
    Upload: any;
    Url: string;
};

export type GQLAddress = {
    __typename?: 'Address';
    addressId: Scalars['String'];
    city: Scalars['String'];
    country: Scalars['String'];
    createdAt: Scalars['DateTime'];
    houseNumber: Scalars['String'];
    location: GQLLocation;
    postCode: Scalars['String'];
    street: Scalars['String'];
    title: Scalars['String'];
};

export type GQLAddressMutation = {
    __typename?: 'AddressMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLAddressMutationCreateOneArgs = {
    address: GQLCreateOneAddressRequest;
};

export type GQLAddressQuery = {
    __typename?: 'AddressQuery';
    findMany?: Maybe<Array<GQLAddress>>;
    userId: Scalars['String'];
};

export type GQLAdmin = {
    __typename?: 'Admin';
    adminId: Scalars['String'];
    createdAt: Scalars['DateTime'];
};

export type GQLAdminMutation = {
    __typename?: 'AdminMutation';
    createOne: Scalars['Boolean'];
};

export type GQLAdminMutationCreateOneArgs = {
    adminId: Scalars['String'];
};

export type GQLAdminQuery = {
    __typename?: 'AdminQuery';
    findMany?: Maybe<Array<GQLAdmin>>;
    findOne?: Maybe<GQLAdmin>;
};

export type GQLAdminQueryFindOneArgs = {
    adminId: Scalars['String'];
};

export type GQLAllergy = {
    __typename?: 'Allergy';
    allergyId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLAllergyMutation = {
    __typename?: 'AllergyMutation';
    createOne: Scalars['Boolean'];
};

export type GQLAllergyMutationCreateOneArgs = {
    request: GQLCreateOneAllergyRequest;
};

export type GQLAllergyQuery = {
    __typename?: 'AllergyQuery';
    findMany?: Maybe<Array<GQLAllergy>>;
};

export type GQLCategory = {
    __typename?: 'Category';
    categoryId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCategoryMutation = {
    __typename?: 'CategoryMutation';
    createOne: Scalars['Boolean'];
};

export type GQLCategoryMutationCreateOneArgs = {
    request: GQLCreateOneCategoryRequest;
};

export type GQLCategoryQuery = {
    __typename?: 'CategoryQuery';
    findMany?: Maybe<Array<GQLCategory>>;
};

export type GQLCook = {
    __typename?: 'Cook';
    biography: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    isLocked: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    languages: Array<GQLLanguage>;
    location: GQLLocation;
    maximumParticipants?: Maybe<Scalars['UInt']>;
    maximumPrice?: Maybe<Scalars['UInt']>;
    maximumTravelDistance?: Maybe<Scalars['UInt']>;
    meals: Array<GQLMeal>;
    menus: Array<GQLMenu>;
    minimumParticipants?: Maybe<Scalars['UInt']>;
    minimumPrice?: Maybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
    user: GQLUser;
};

export type GQLCookMutation = {
    __typename?: 'CookMutation';
    createOne: Scalars['Boolean'];
    meals: GQLMealMutation;
    menus: GQLMenuMutation;
};

export type GQLCookMutationCreateOneArgs = {
    cook: GQLCreateOneCookRequest;
};

export type GQLCookMutationMealsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookMutationMenusArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQuery = {
    __typename?: 'CookQuery';
    findMany?: Maybe<Array<GQLCook>>;
    findOne?: Maybe<GQLCook>;
    meals: GQLMealQuery;
    menus: GQLMenuQuery;
};

export type GQLCookQueryFindManyArgs = {
    request: GQLFindManyCooksRequest;
};

export type GQLCookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryMealsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookQueryMenusArgs = {
    cookId: Scalars['String'];
};

export type GQLCookRank = 'HOBBY' | 'MASTER' | 'PROFESSIONAL';

export type GQLCreateOneAddressRequest = {
    city: Scalars['String'];
    country: Scalars['String'];
    houseNumber: Scalars['String'];
    location: GQLLocationInput;
    postCode: Scalars['String'];
    street: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCreateOneAllergyRequest = {
    title: Scalars['String'];
};

export type GQLCreateOneCategoryRequest = {
    title: Scalars['String'];
};

export type GQLCreateOneCookRequest = {
    biography: Scalars['String'];
    isVisible: Scalars['Boolean'];
    location: GQLLocationInput;
    maximumParticipants?: InputMaybe<Scalars['UInt']>;
    maximumPrice?: InputMaybe<Scalars['UInt']>;
    maximumTravelDistance?: InputMaybe<Scalars['UInt']>;
    minimumParticipants?: InputMaybe<Scalars['UInt']>;
    minimumPrice?: InputMaybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
};

export type GQLCreateOneKitchenRequest = {
    title: Scalars['String'];
};

export type GQLCreateOneLanguageRequest = {
    title: Scalars['String'];
};

export type GQLCreateOneMealRequest = {
    description: Scalars['String'];
    imageUrl?: InputMaybe<Scalars['Url']>;
    title: Scalars['String'];
    type: GQLMealType;
};

export type GQLCreateOneMenuRequest = {
    basePrice: Scalars['UInt'];
    basePriceCustomers: Scalars['UInt'];
    currencyCode: GQLCurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    kitchenId?: InputMaybe<Scalars['String']>;
    preparationTime: Scalars['UInt'];
    pricePerAdult: Scalars['UInt'];
    pricePerChild?: InputMaybe<Scalars['UInt']>;
    title: Scalars['String'];
};

export type GQLCreateOneSessionByEmailAddressRequest = {
    emailAddress: Scalars['EmailAddress'];
    password: Scalars['String'];
    platform: GQLPlatform;
    pushToken?: InputMaybe<Scalars['String']>;
    title: Scalars['String'];
};

export type GQLCreateOneSessionByIdentityProviderRequest = {
    idToken: Scalars['String'];
    identityProvider: GQLIdentityProvider;
    platform: GQLPlatform;
    title: Scalars['String'];
};

export type GQLCreateOneSessionByPhoneNumberRequest = {
    password: Scalars['String'];
    phoneNumber: Scalars['String'];
    platform: GQLPlatform;
    pushToken?: InputMaybe<Scalars['String']>;
    title: Scalars['String'];
};

export type GQLCreateOneUserByEmailAddressRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    emailAddress: Scalars['EmailAddress'];
    firstName: Scalars['String'];
    gender: Gender;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
};

export type GQLCreateOneUserByIdentityProviderRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    firstName: Scalars['String'];
    gender: Gender;
    idToken: Scalars['String'];
    identityProvider: GQLIdentityProvider;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
};

export type GQLCreateOneUserByPhoneNumberRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    firstName: Scalars['String'];
    gender: Gender;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
    phoneNumber: Scalars['PhoneNumber'];
};

export type GQLCurrencyCode = 'EUR' | 'USD';

export type GQLEmailAddressUpdate = {
    __typename?: 'EmailAddressUpdate';
    createdAt: Scalars['DateTime'];
    emailAddress: Scalars['EmailAddress'];
    userId: Scalars['String'];
};

export type GQLEmailAddressUpdateMutation = {
    __typename?: 'EmailAddressUpdateMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLEmailAddressUpdateMutationCreateOneArgs = {
    emailAddress: Scalars['EmailAddress'];
};

export type GQLEmailAddressUpdateQuery = {
    __typename?: 'EmailAddressUpdateQuery';
    findOne?: Maybe<GQLEmailAddressUpdate>;
    userId: Scalars['String'];
};

export type GQLExpireOneSessionRequest = {
    sessionId: Scalars['String'];
    userId: Scalars['String'];
};

export type GQLFavoriteCook = {
    __typename?: 'FavoriteCook';
    cook: GQLCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    user: GQLUser;
    userId: Scalars['String'];
};

export type GQLFavoriteCookMutation = {
    __typename?: 'FavoriteCookMutation';
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
};

export type GQLFavoriteCookQuery = {
    __typename?: 'FavoriteCookQuery';
    findMany: Array<GQLFavoriteCook>;
};

export type GQLFindManyCooksRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type GQLFindManyMealsRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type GQLFindManyMenusRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type GQLFindManyPublicCooksRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type GQLFindManyPublicMenusRequest = {
    searchText?: InputMaybe<Scalars['String']>;
};

export type GQLFindManyRequest = {
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UInt']>;
    take?: InputMaybe<Scalars['UInt']>;
};

export type GQLFindManyUsersRequest = {
    pagination: GQLFindManyRequest;
};

export { Gender };

export type GQLIdentityProvider = 'APPLE' | 'GOOGLE';

export type GQLKitchen = {
    __typename?: 'Kitchen';
    kitchenId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLKitchenMutation = {
    __typename?: 'KitchenMutation';
    createOne: Scalars['Boolean'];
};

export type GQLKitchenMutationCreateOneArgs = {
    request: GQLCreateOneKitchenRequest;
};

export type GQLKitchenQuery = {
    __typename?: 'KitchenQuery';
    findMany?: Maybe<Array<GQLKitchen>>;
};

export type GQLLanguage = {
    __typename?: 'Language';
    languageId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLLanguageMutation = {
    __typename?: 'LanguageMutation';
    createOne: Scalars['Boolean'];
};

export type GQLLanguageMutationCreateOneArgs = {
    request: GQLCreateOneLanguageRequest;
};

export type GQLLanguageQuery = {
    __typename?: 'LanguageQuery';
    findMany?: Maybe<Array<GQLLanguage>>;
};

export type GQLLocation = {
    __typename?: 'Location';
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
};

export type GQLLocationInput = {
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
};

export type GQLMeal = {
    __typename?: 'Meal';
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    description: Scalars['String'];
    imageUrl?: Maybe<Scalars['Url']>;
    mealId: Scalars['String'];
    title: Scalars['String'];
    type: GQLMealType;
};

export type GQLMealMutation = {
    __typename?: 'MealMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
};

export type GQLMealMutationCreateOneArgs = {
    meal: GQLCreateOneMealRequest;
};

export type GQLMealQuery = {
    __typename?: 'MealQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<GQLMeal>>;
    findOne?: Maybe<GQLMeal>;
};

export type GQLMealQueryFindManyArgs = {
    request: GQLFindManyMealsRequest;
};

export type GQLMealQueryFindOneArgs = {
    mealId: Scalars['String'];
};

export type GQLMealType = 'DESSERT' | 'MAIN_COURSE' | 'STARTER';

export type GQLMenu = {
    __typename?: 'Menu';
    basePrice: Scalars['UInt'];
    basePriceCustomers: Scalars['UInt'];
    categories: Array<GQLCategory>;
    cook: GQLCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    currencyCode: GQLCurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    kitchen?: Maybe<GQLKitchen>;
    kitchenId?: Maybe<Scalars['String']>;
    menuId: Scalars['String'];
    preparationTime: Scalars['UInt'];
    pricePerAdult: Scalars['UInt'];
    pricePerChild?: Maybe<Scalars['UInt']>;
    title: Scalars['String'];
};

export type GQLMenuMutation = {
    __typename?: 'MenuMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
};

export type GQLMenuMutationCreateOneArgs = {
    menu: GQLCreateOneMenuRequest;
};

export type GQLMenuQuery = {
    __typename?: 'MenuQuery';
    cookId: Scalars['String'];
    findMany?: Maybe<Array<GQLMenu>>;
    findOne?: Maybe<GQLMenu>;
};

export type GQLMenuQueryFindManyArgs = {
    request: GQLFindManyMenusRequest;
};

export type GQLMenuQueryFindOneArgs = {
    menuId: Scalars['String'];
};

export type GQLMutation = {
    __typename?: 'Mutation';
    admins: GQLAdminMutation;
    allergies: GQLAllergyMutation;
    categories: GQLCategoryMutation;
    cooks: GQLCookMutation;
    kitchens: GQLKitchenMutation;
    languages: GQLLanguageMutation;
    privacyPolicyUpdates: GQLPrivacyPolicyUpdateMutation;
    sessions: GQLSessionMutation;
    termsUpdates: GQLTermsUpdateMutation;
    users: GQLUserMutation;
};

export type GQLNotification = {
    __typename?: 'Notification';
    createdAt: Scalars['DateTime'];
    message: Scalars['String'];
    notificationId: Scalars['String'];
    url?: Maybe<Scalars['Url']>;
    userId: Scalars['String'];
    wasRead?: Maybe<Scalars['Boolean']>;
};

export type GQLNotificationConfiguration = {
    __typename?: 'NotificationConfiguration';
    createdAt: Scalars['DateTime'];
    userId: Scalars['String'];
};

export type GQLNotificationConfigurationMutation = {
    __typename?: 'NotificationConfigurationMutation';
    userId: Scalars['String'];
};

export type GQLNotificationConfigurationQuery = {
    __typename?: 'NotificationConfigurationQuery';
    findOne?: Maybe<GQLNotificationConfiguration>;
    userId: Scalars['String'];
};

export type GQLNotificationMutation = {
    __typename?: 'NotificationMutation';
    userId: Scalars['String'];
};

export type GQLNotificationQuery = {
    __typename?: 'NotificationQuery';
    findMany?: Maybe<Array<GQLNotification>>;
    userId: Scalars['String'];
};

export type GQLOneTimeAccessToken = {
    __typename?: 'OneTimeAccessToken';
    createdAt: Scalars['DateTime'];
    userId: Scalars['String'];
};

export type GQLOneTimeAccessTokenMutation = {
    __typename?: 'OneTimeAccessTokenMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLOneTimeAccessTokenQuery = {
    __typename?: 'OneTimeAccessTokenQuery';
    findMany?: Maybe<Array<GQLOneTimeAccessToken>>;
    userId: Scalars['String'];
};

export type GQLPaymentQuery = {
    __typename?: 'PaymentQuery';
    stripe: GQLStripeQuery;
};

export type GQLPhoneNumberUpdate = {
    __typename?: 'PhoneNumberUpdate';
    createdAt: Scalars['DateTime'];
    phoneNumber: Scalars['PhoneNumber'];
    userId: Scalars['String'];
};

export type GQLPhoneNumberUpdateMutation = {
    __typename?: 'PhoneNumberUpdateMutation';
    createOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLPhoneNumberUpdateMutationCreateOneArgs = {
    phoneNumber: Scalars['PhoneNumber'];
};

export type GQLPhoneNumberUpdateQuery = {
    __typename?: 'PhoneNumberUpdateQuery';
    findOne?: Maybe<GQLPhoneNumberUpdate>;
    userId: Scalars['String'];
};

export type GQLPlatform = 'ANDROID' | 'BROWSER' | 'IOS' | 'NO_INFORMATION';

export type GQLPrice = {
    __typename?: 'Price';
    amount: Scalars['UInt'];
    currencyCode: GQLCurrencyCode;
};

export type GQLPriceInput = {
    amount: Scalars['UInt'];
    currencyCode: GQLCurrencyCode;
};

export type GQLPrivacyPolicyUpdate = {
    __typename?: 'PrivacyPolicyUpdate';
    admin: GQLAdmin;
    adminId: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPrivacyPolicyUpdateMutation = {
    __typename?: 'PrivacyPolicyUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type GQLPrivacyPolicyUpdateQuery = {
    __typename?: 'PrivacyPolicyUpdateQuery';
    findLatest?: Maybe<GQLPrivacyPolicyUpdate>;
    findMany?: Maybe<Array<GQLPrivacyPolicyUpdate>>;
};

export type GQLPublicCook = {
    __typename?: 'PublicCook';
    biography: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    languages: Array<GQLLanguage>;
    location: GQLLocation;
    maximumParticipants?: Maybe<Scalars['UInt']>;
    maximumPrice?: Maybe<Scalars['UInt']>;
    maximumTravelDistance?: Maybe<Scalars['UInt']>;
    menus: Array<GQLPublicMenu>;
    minimumParticipants?: Maybe<Scalars['UInt']>;
    minimumPrice?: Maybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
    user: GQLPublicUser;
};

export type GQLPublicCookQuery = {
    __typename?: 'PublicCookQuery';
    findMany?: Maybe<Array<GQLPublicCook>>;
    findOne?: Maybe<GQLPublicCook>;
};

export type GQLPublicCookQueryFindManyArgs = {
    request: GQLFindManyPublicCooksRequest;
};

export type GQLPublicCookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type GQLPublicMenu = {
    __typename?: 'PublicMenu';
    basePrice: Scalars['UInt'];
    basePriceCustomers: Scalars['UInt'];
    categories: Array<GQLCategory>;
    cook: GQLPublicCook;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    description: Scalars['String'];
    greetingFromKitchen: Scalars['Boolean'];
    kitchen?: Maybe<GQLKitchen>;
    kitchenId?: Maybe<Scalars['String']>;
    menuId: Scalars['String'];
    preparationTime: Scalars['UInt'];
    pricePerAdult: Scalars['UInt'];
    pricePerChild?: Maybe<Scalars['UInt']>;
    title: Scalars['String'];
};

export type GQLPublicMenuQuery = {
    __typename?: 'PublicMenuQuery';
    findMany?: Maybe<Array<GQLPublicMenu>>;
    findOne?: Maybe<GQLPublicMenu>;
};

export type GQLPublicMenuQueryFindManyArgs = {
    request: GQLFindManyPublicMenusRequest;
};

export type GQLPublicMenuQueryFindOneArgs = {
    menuId: Scalars['String'];
};

export type GQLPublicPrivacyPolicyUpdate = {
    __typename?: 'PublicPrivacyPolicyUpdate';
    createdAt?: Maybe<Scalars['DateTime']>;
    englishText: Scalars['String'];
    germanText: Scalars['String'];
};

export type GQLPublicPrivacyPolicyUpdateQuery = {
    __typename?: 'PublicPrivacyPolicyUpdateQuery';
    findLatest?: Maybe<GQLPublicPrivacyPolicyUpdate>;
    findMany?: Maybe<Array<GQLPublicPrivacyPolicyUpdate>>;
};

export type GQLPublicTermsUpdate = {
    __typename?: 'PublicTermsUpdate';
    createdAt?: Maybe<Scalars['DateTime']>;
    englishText: Scalars['String'];
    germanText: Scalars['String'];
};

export type GQLPublicTermsUpdateQuery = {
    __typename?: 'PublicTermsUpdateQuery';
    findLatest?: Maybe<GQLPublicTermsUpdate>;
    findMany?: Maybe<Array<GQLPublicTermsUpdate>>;
};

export type GQLPublicUser = {
    __typename?: 'PublicUser';
    firstName: Scalars['String'];
    profilePictureUrl?: Maybe<Scalars['Url']>;
    userId: Scalars['String'];
};

export type GQLQuery = {
    __typename?: 'Query';
    admins: GQLAdminQuery;
    allergies: GQLAllergyQuery;
    categories: GQLCategoryQuery;
    cooks: GQLCookQuery;
    kitchens: GQLKitchenQuery;
    languages: GQLLanguageQuery;
    payments: GQLPaymentQuery;
    privacyPolicyUpdates: GQLPrivacyPolicyUpdateQuery;
    publicCooks: GQLPublicCookQuery;
    publicMenus: GQLPublicMenuQuery;
    publicPrivacyPolicyUpdates: GQLPublicPrivacyPolicyUpdateQuery;
    publicTermsUpdates: GQLPublicTermsUpdateQuery;
    status: GQLStatusQuery;
    termsUpdates: GQLTermsUpdateQuery;
    users: GQLUserQuery;
};

export type GQLSession = {
    __typename?: 'Session';
    createdAt: Scalars['DateTime'];
    expired: Scalars['Boolean'];
    lastExtendedAt: Scalars['DateTime'];
    platform: GQLPlatform;
    sessionId: Scalars['String'];
    title?: Maybe<Scalars['String']>;
    userId?: Maybe<Scalars['String']>;
};

export type GQLSessionMutation = {
    __typename?: 'SessionMutation';
    assignOneByEmailAddress: Scalars['Boolean'];
    assignOneByIdentityProvider: Scalars['Boolean'];
    assignOneByPhoneNumber: Scalars['Boolean'];
};

export type GQLSessionMutationAssignOneByEmailAddressArgs = {
    request: GQLCreateOneSessionByEmailAddressRequest;
};

export type GQLSessionMutationAssignOneByIdentityProviderArgs = {
    request: GQLCreateOneSessionByIdentityProviderRequest;
};

export type GQLSessionMutationAssignOneByPhoneNumberArgs = {
    request: GQLCreateOneSessionByPhoneNumberRequest;
};

export type GQLSessionQuery = {
    __typename?: 'SessionQuery';
    findMany?: Maybe<Array<GQLSession>>;
    userId: Scalars['String'];
};

export type GQLStatusQuery = {
    __typename?: 'StatusQuery';
    latestIosVersion: Scalars['String'];
};

export type GQLStripeQuery = {
    __typename?: 'StripeQuery';
    publishableKey: Scalars['String'];
};

export type GQLTermsUpdate = {
    __typename?: 'TermsUpdate';
    adminId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    termsUpdateId: Scalars['String'];
};

export type GQLTermsUpdateMutation = {
    __typename?: 'TermsUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type GQLTermsUpdateQuery = {
    __typename?: 'TermsUpdateQuery';
    findMany?: Maybe<Array<GQLTermsUpdate>>;
};

export type GQLUser = {
    __typename?: 'User';
    acceptedPrivacyPolicy: Scalars['DateTime'];
    acceptedTerms: Scalars['DateTime'];
    addressCount: Scalars['UInt'];
    addresses: Array<GQLAddress>;
    admin?: Maybe<GQLAdmin>;
    birthDate?: Maybe<Scalars['Date']>;
    cook?: Maybe<GQLCook>;
    createdAt: Scalars['DateTime'];
    emailAddress?: Maybe<Scalars['EmailAddress']>;
    firstName: Scalars['String'];
    gender: Gender;
    isAdmin: Scalars['Boolean'];
    isCook: Scalars['Boolean'];
    lastName: Scalars['String'];
    phoneNumber?: Maybe<Scalars['PhoneNumber']>;
    profilePictureUrl?: Maybe<Scalars['Url']>;
    userId: Scalars['String'];
};

export type GQLUserLanguage = 'ENGLISH' | 'GERMAN';

export type GQLUserMutation = {
    __typename?: 'UserMutation';
    acceptLatestPrivacyPolicy: Scalars['Boolean'];
    acceptLatestTerms: Scalars['Boolean'];
    addresses: GQLAddressMutation;
    createOneByEmailAddress: Scalars['Boolean'];
    createOneByIdentityProvider: Scalars['Boolean'];
    createOneByPhoneNumber: Scalars['Boolean'];
    emailAddressUpdates: GQLEmailAddressUpdateMutation;
    favoriteCooks: GQLFavoriteCookQuery;
    lockOne: Scalars['Boolean'];
    notificationConfigurations: GQLNotificationConfigurationMutation;
    notifications: GQLNotificationMutation;
    oneTimeAccessTokens: GQLOneTimeAccessTokenMutation;
    phoneNumberUpdates: GQLPhoneNumberUpdateMutation;
    sessions: GQLUserSessionMutation;
    updateGender: Scalars['Boolean'];
    updatePassword: Scalars['Boolean'];
    updateProfilePicture: Scalars['Boolean'];
};

export type GQLUserMutationAddressesArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationCreateOneByEmailAddressArgs = {
    request: GQLCreateOneUserByEmailAddressRequest;
};

export type GQLUserMutationCreateOneByIdentityProviderArgs = {
    request: GQLCreateOneUserByIdentityProviderRequest;
};

export type GQLUserMutationCreateOneByPhoneNumberArgs = {
    request: GQLCreateOneUserByPhoneNumberRequest;
};

export type GQLUserMutationEmailAddressUpdatesArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationFavoriteCooksArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationLockOneArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationNotificationConfigurationsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationNotificationsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationOneTimeAccessTokensArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationPhoneNumberUpdatesArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationSessionsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationUpdateGenderArgs = {
    gender: Gender;
    userId: Scalars['String'];
};

export type GQLUserMutationUpdatePasswordArgs = {
    password: Scalars['String'];
    userId: Scalars['String'];
};

export type GQLUserMutationUpdateProfilePictureArgs = {
    profilePicture?: InputMaybe<Scalars['Upload']>;
    userId: Scalars['String'];
};

export type GQLUserQuery = {
    __typename?: 'UserQuery';
    addresses: GQLAddressQuery;
    emailAddressUpdates: GQLEmailAddressUpdateQuery;
    favoriteCooks: GQLFavoriteCookQuery;
    findMany?: Maybe<Array<GQLUser>>;
    findOne?: Maybe<GQLUser>;
    me?: Maybe<GQLUser>;
    notificationConfigurations: GQLNotificationConfigurationQuery;
    notifications: GQLNotificationQuery;
    oneTimeAccessTokens: GQLOneTimeAccessTokenQuery;
    phoneNumberUpdates: GQLPhoneNumberUpdateQuery;
    sessions: GQLSessionQuery;
};

export type GQLUserQueryAddressesArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryEmailAddressUpdatesArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryFavoriteCooksArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryFindManyArgs = {
    request: GQLFindManyUsersRequest;
};

export type GQLUserQueryFindOneArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryMeArgs = {
    pushToken?: InputMaybe<Scalars['String']>;
};

export type GQLUserQueryNotificationConfigurationsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryNotificationsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryOneTimeAccessTokensArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryPhoneNumberUpdatesArgs = {
    userId: Scalars['String'];
};

export type GQLUserQuerySessionsArgs = {
    userId: Scalars['String'];
};

export type GQLUserSessionMutation = {
    __typename?: 'UserSessionMutation';
    expireCurrent: Scalars['Boolean'];
    expireMany: Scalars['Boolean'];
    expireOne: Scalars['Boolean'];
};

export type GQLUserSessionMutationExpireManyArgs = {
    request: Array<Scalars['String']>;
};

export type GQLUserSessionMutationExpireOneArgs = {
    request: GQLExpireOneSessionRequest;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = {
    Address: ResolverTypeWrapper<GQLAddress>;
    AddressMutation: ResolverTypeWrapper<GQLAddressMutation>;
    AddressQuery: ResolverTypeWrapper<GQLAddressQuery>;
    Admin: ResolverTypeWrapper<GQLAdmin>;
    AdminMutation: ResolverTypeWrapper<GQLAdminMutation>;
    AdminQuery: ResolverTypeWrapper<GQLAdminQuery>;
    Allergy: ResolverTypeWrapper<GQLAllergy>;
    AllergyMutation: ResolverTypeWrapper<GQLAllergyMutation>;
    AllergyQuery: ResolverTypeWrapper<GQLAllergyQuery>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Category: ResolverTypeWrapper<GQLCategory>;
    CategoryMutation: ResolverTypeWrapper<GQLCategoryMutation>;
    CategoryQuery: ResolverTypeWrapper<GQLCategoryQuery>;
    Cook: ResolverTypeWrapper<GQLCook>;
    CookMutation: ResolverTypeWrapper<GQLCookMutation>;
    CookQuery: ResolverTypeWrapper<GQLCookQuery>;
    CookRank: GQLCookRank;
    CreateOneAddressRequest: GQLCreateOneAddressRequest;
    CreateOneAllergyRequest: GQLCreateOneAllergyRequest;
    CreateOneCategoryRequest: GQLCreateOneCategoryRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
    CreateOneKitchenRequest: GQLCreateOneKitchenRequest;
    CreateOneLanguageRequest: GQLCreateOneLanguageRequest;
    CreateOneMealRequest: GQLCreateOneMealRequest;
    CreateOneMenuRequest: GQLCreateOneMenuRequest;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    CurrencyCode: GQLCurrencyCode;
    Date: ResolverTypeWrapper<Scalars['Date']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
    EmailAddressUpdate: ResolverTypeWrapper<GQLEmailAddressUpdate>;
    EmailAddressUpdateMutation: ResolverTypeWrapper<GQLEmailAddressUpdateMutation>;
    EmailAddressUpdateQuery: ResolverTypeWrapper<GQLEmailAddressUpdateQuery>;
    ExpireOneSessionRequest: GQLExpireOneSessionRequest;
    FavoriteCook: ResolverTypeWrapper<GQLFavoriteCook>;
    FavoriteCookMutation: ResolverTypeWrapper<GQLFavoriteCookMutation>;
    FavoriteCookQuery: ResolverTypeWrapper<GQLFavoriteCookQuery>;
    FindManyCooksRequest: GQLFindManyCooksRequest;
    FindManyMealsRequest: GQLFindManyMealsRequest;
    FindManyMenusRequest: GQLFindManyMenusRequest;
    FindManyPublicCooksRequest: GQLFindManyPublicCooksRequest;
    FindManyPublicMenusRequest: GQLFindManyPublicMenusRequest;
    FindManyRequest: GQLFindManyRequest;
    FindManyUsersRequest: GQLFindManyUsersRequest;
    Gender: Gender;
    IdentityProvider: GQLIdentityProvider;
    Kitchen: ResolverTypeWrapper<GQLKitchen>;
    KitchenMutation: ResolverTypeWrapper<GQLKitchenMutation>;
    KitchenQuery: ResolverTypeWrapper<GQLKitchenQuery>;
    Language: ResolverTypeWrapper<GQLLanguage>;
    LanguageMutation: ResolverTypeWrapper<GQLLanguageMutation>;
    LanguageQuery: ResolverTypeWrapper<GQLLanguageQuery>;
    Latitude: ResolverTypeWrapper<Scalars['Latitude']>;
    Location: ResolverTypeWrapper<GQLLocation>;
    LocationInput: GQLLocationInput;
    Longitude: ResolverTypeWrapper<Scalars['Longitude']>;
    Meal: ResolverTypeWrapper<GQLMeal>;
    MealMutation: ResolverTypeWrapper<GQLMealMutation>;
    MealQuery: ResolverTypeWrapper<GQLMealQuery>;
    MealType: GQLMealType;
    Menu: ResolverTypeWrapper<GQLMenu>;
    MenuMutation: ResolverTypeWrapper<GQLMenuMutation>;
    MenuQuery: ResolverTypeWrapper<GQLMenuQuery>;
    Mutation: ResolverTypeWrapper<{}>;
    Notification: ResolverTypeWrapper<GQLNotification>;
    NotificationConfiguration: ResolverTypeWrapper<GQLNotificationConfiguration>;
    NotificationConfigurationMutation: ResolverTypeWrapper<GQLNotificationConfigurationMutation>;
    NotificationConfigurationQuery: ResolverTypeWrapper<GQLNotificationConfigurationQuery>;
    NotificationMutation: ResolverTypeWrapper<GQLNotificationMutation>;
    NotificationQuery: ResolverTypeWrapper<GQLNotificationQuery>;
    OneTimeAccessToken: ResolverTypeWrapper<GQLOneTimeAccessToken>;
    OneTimeAccessTokenMutation: ResolverTypeWrapper<GQLOneTimeAccessTokenMutation>;
    OneTimeAccessTokenQuery: ResolverTypeWrapper<GQLOneTimeAccessTokenQuery>;
    PaymentQuery: ResolverTypeWrapper<GQLPaymentQuery>;
    PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
    PhoneNumberUpdate: ResolverTypeWrapper<GQLPhoneNumberUpdate>;
    PhoneNumberUpdateMutation: ResolverTypeWrapper<GQLPhoneNumberUpdateMutation>;
    PhoneNumberUpdateQuery: ResolverTypeWrapper<GQLPhoneNumberUpdateQuery>;
    Platform: GQLPlatform;
    Price: ResolverTypeWrapper<GQLPrice>;
    PriceInput: GQLPriceInput;
    PrivacyPolicyUpdate: ResolverTypeWrapper<GQLPrivacyPolicyUpdate>;
    PrivacyPolicyUpdateMutation: ResolverTypeWrapper<GQLPrivacyPolicyUpdateMutation>;
    PrivacyPolicyUpdateQuery: ResolverTypeWrapper<GQLPrivacyPolicyUpdateQuery>;
    PublicCook: ResolverTypeWrapper<GQLPublicCook>;
    PublicCookQuery: ResolverTypeWrapper<GQLPublicCookQuery>;
    PublicMenu: ResolverTypeWrapper<GQLPublicMenu>;
    PublicMenuQuery: ResolverTypeWrapper<GQLPublicMenuQuery>;
    PublicPrivacyPolicyUpdate: ResolverTypeWrapper<GQLPublicPrivacyPolicyUpdate>;
    PublicPrivacyPolicyUpdateQuery: ResolverTypeWrapper<GQLPublicPrivacyPolicyUpdateQuery>;
    PublicTermsUpdate: ResolverTypeWrapper<GQLPublicTermsUpdate>;
    PublicTermsUpdateQuery: ResolverTypeWrapper<GQLPublicTermsUpdateQuery>;
    PublicUser: ResolverTypeWrapper<GQLPublicUser>;
    Query: ResolverTypeWrapper<{}>;
    Session: ResolverTypeWrapper<GQLSession>;
    SessionMutation: ResolverTypeWrapper<GQLSessionMutation>;
    SessionQuery: ResolverTypeWrapper<GQLSessionQuery>;
    StatusQuery: ResolverTypeWrapper<GQLStatusQuery>;
    String: ResolverTypeWrapper<Scalars['String']>;
    StripeQuery: ResolverTypeWrapper<GQLStripeQuery>;
    TermsUpdate: ResolverTypeWrapper<GQLTermsUpdate>;
    TermsUpdateMutation: ResolverTypeWrapper<GQLTermsUpdateMutation>;
    TermsUpdateQuery: ResolverTypeWrapper<GQLTermsUpdateQuery>;
    UInt: ResolverTypeWrapper<Scalars['UInt']>;
    UUID: ResolverTypeWrapper<Scalars['UUID']>;
    Upload: ResolverTypeWrapper<Scalars['Upload']>;
    Url: ResolverTypeWrapper<Scalars['Url']>;
    User: ResolverTypeWrapper<GQLUser>;
    UserLanguage: GQLUserLanguage;
    UserMutation: ResolverTypeWrapper<GQLUserMutation>;
    UserQuery: ResolverTypeWrapper<GQLUserQuery>;
    UserSessionMutation: ResolverTypeWrapper<GQLUserSessionMutation>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
    Address: GQLAddress;
    AddressMutation: GQLAddressMutation;
    AddressQuery: GQLAddressQuery;
    Admin: GQLAdmin;
    AdminMutation: GQLAdminMutation;
    AdminQuery: GQLAdminQuery;
    Allergy: GQLAllergy;
    AllergyMutation: GQLAllergyMutation;
    AllergyQuery: GQLAllergyQuery;
    Boolean: Scalars['Boolean'];
    Category: GQLCategory;
    CategoryMutation: GQLCategoryMutation;
    CategoryQuery: GQLCategoryQuery;
    Cook: GQLCook;
    CookMutation: GQLCookMutation;
    CookQuery: GQLCookQuery;
    CreateOneAddressRequest: GQLCreateOneAddressRequest;
    CreateOneAllergyRequest: GQLCreateOneAllergyRequest;
    CreateOneCategoryRequest: GQLCreateOneCategoryRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
    CreateOneKitchenRequest: GQLCreateOneKitchenRequest;
    CreateOneLanguageRequest: GQLCreateOneLanguageRequest;
    CreateOneMealRequest: GQLCreateOneMealRequest;
    CreateOneMenuRequest: GQLCreateOneMenuRequest;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    Date: Scalars['Date'];
    DateTime: Scalars['DateTime'];
    EmailAddress: Scalars['EmailAddress'];
    EmailAddressUpdate: GQLEmailAddressUpdate;
    EmailAddressUpdateMutation: GQLEmailAddressUpdateMutation;
    EmailAddressUpdateQuery: GQLEmailAddressUpdateQuery;
    ExpireOneSessionRequest: GQLExpireOneSessionRequest;
    FavoriteCook: GQLFavoriteCook;
    FavoriteCookMutation: GQLFavoriteCookMutation;
    FavoriteCookQuery: GQLFavoriteCookQuery;
    FindManyCooksRequest: GQLFindManyCooksRequest;
    FindManyMealsRequest: GQLFindManyMealsRequest;
    FindManyMenusRequest: GQLFindManyMenusRequest;
    FindManyPublicCooksRequest: GQLFindManyPublicCooksRequest;
    FindManyPublicMenusRequest: GQLFindManyPublicMenusRequest;
    FindManyRequest: GQLFindManyRequest;
    FindManyUsersRequest: GQLFindManyUsersRequest;
    Kitchen: GQLKitchen;
    KitchenMutation: GQLKitchenMutation;
    KitchenQuery: GQLKitchenQuery;
    Language: GQLLanguage;
    LanguageMutation: GQLLanguageMutation;
    LanguageQuery: GQLLanguageQuery;
    Latitude: Scalars['Latitude'];
    Location: GQLLocation;
    LocationInput: GQLLocationInput;
    Longitude: Scalars['Longitude'];
    Meal: GQLMeal;
    MealMutation: GQLMealMutation;
    MealQuery: GQLMealQuery;
    Menu: GQLMenu;
    MenuMutation: GQLMenuMutation;
    MenuQuery: GQLMenuQuery;
    Mutation: {};
    Notification: GQLNotification;
    NotificationConfiguration: GQLNotificationConfiguration;
    NotificationConfigurationMutation: GQLNotificationConfigurationMutation;
    NotificationConfigurationQuery: GQLNotificationConfigurationQuery;
    NotificationMutation: GQLNotificationMutation;
    NotificationQuery: GQLNotificationQuery;
    OneTimeAccessToken: GQLOneTimeAccessToken;
    OneTimeAccessTokenMutation: GQLOneTimeAccessTokenMutation;
    OneTimeAccessTokenQuery: GQLOneTimeAccessTokenQuery;
    PaymentQuery: GQLPaymentQuery;
    PhoneNumber: Scalars['PhoneNumber'];
    PhoneNumberUpdate: GQLPhoneNumberUpdate;
    PhoneNumberUpdateMutation: GQLPhoneNumberUpdateMutation;
    PhoneNumberUpdateQuery: GQLPhoneNumberUpdateQuery;
    Price: GQLPrice;
    PriceInput: GQLPriceInput;
    PrivacyPolicyUpdate: GQLPrivacyPolicyUpdate;
    PrivacyPolicyUpdateMutation: GQLPrivacyPolicyUpdateMutation;
    PrivacyPolicyUpdateQuery: GQLPrivacyPolicyUpdateQuery;
    PublicCook: GQLPublicCook;
    PublicCookQuery: GQLPublicCookQuery;
    PublicMenu: GQLPublicMenu;
    PublicMenuQuery: GQLPublicMenuQuery;
    PublicPrivacyPolicyUpdate: GQLPublicPrivacyPolicyUpdate;
    PublicPrivacyPolicyUpdateQuery: GQLPublicPrivacyPolicyUpdateQuery;
    PublicTermsUpdate: GQLPublicTermsUpdate;
    PublicTermsUpdateQuery: GQLPublicTermsUpdateQuery;
    PublicUser: GQLPublicUser;
    Query: {};
    Session: GQLSession;
    SessionMutation: GQLSessionMutation;
    SessionQuery: GQLSessionQuery;
    StatusQuery: GQLStatusQuery;
    String: Scalars['String'];
    StripeQuery: GQLStripeQuery;
    TermsUpdate: GQLTermsUpdate;
    TermsUpdateMutation: GQLTermsUpdateMutation;
    TermsUpdateQuery: GQLTermsUpdateQuery;
    UInt: Scalars['UInt'];
    UUID: Scalars['UUID'];
    Upload: Scalars['Upload'];
    Url: Scalars['Url'];
    User: GQLUser;
    UserMutation: GQLUserMutation;
    UserQuery: GQLUserQuery;
    UserSessionMutation: GQLUserSessionMutation;
};

export type GQLAddressResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Address'] = GQLResolversParentTypes['Address'],
> = {
    addressId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    city?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    country?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    houseNumber?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    postCode?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    street?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAddressMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['AddressMutation'] = GQLResolversParentTypes['AddressMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLAddressMutationCreateOneArgs, 'address'>>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAddressQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['AddressQuery'] = GQLResolversParentTypes['AddressQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Address']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Admin'] = GQLResolversParentTypes['Admin'],
> = {
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['AdminMutation'] = GQLResolversParentTypes['AdminMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLAdminMutationCreateOneArgs, 'adminId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['AdminQuery'] = GQLResolversParentTypes['AdminQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Admin']>>, ParentType, ContextType>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Admin']>, ParentType, ContextType, RequireFields<GQLAdminQueryFindOneArgs, 'adminId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Allergy'] = GQLResolversParentTypes['Allergy'],
> = {
    allergyId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['AllergyMutation'] = GQLResolversParentTypes['AllergyMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLAllergyMutationCreateOneArgs, 'request'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['AllergyQuery'] = GQLResolversParentTypes['AllergyQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Allergy']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Category'] = GQLResolversParentTypes['Category'],
> = {
    categoryId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['CategoryMutation'] = GQLResolversParentTypes['CategoryMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCategoryMutationCreateOneArgs, 'request'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['CategoryQuery'] = GQLResolversParentTypes['CategoryQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Category']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Cook'] = GQLResolversParentTypes['Cook'],
> = {
    biography?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    isLocked?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isVisible?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    languages?: Resolver<Array<GQLResolversTypes['Language']>, ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    maximumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumTravelDistance?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    meals?: Resolver<Array<GQLResolversTypes['Meal']>, ParentType, ContextType>;
    menus?: Resolver<Array<GQLResolversTypes['Menu']>, ParentType, ContextType>;
    minimumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    rank?: Resolver<GQLResolversTypes['CookRank'], ParentType, ContextType>;
    travelExpenses?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['CookMutation'] = GQLResolversParentTypes['CookMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMutationCreateOneArgs, 'cook'>>;
    meals?: Resolver<GQLResolversTypes['MealMutation'], ParentType, ContextType, RequireFields<GQLCookMutationMealsArgs, 'cookId'>>;
    menus?: Resolver<GQLResolversTypes['MenuMutation'], ParentType, ContextType, RequireFields<GQLCookMutationMenusArgs, 'cookId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['CookQuery'] = GQLResolversParentTypes['CookQuery'],
> = {
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['Cook']>>,
        ParentType,
        ContextType,
        RequireFields<GQLCookQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<Maybe<GQLResolversTypes['Cook']>, ParentType, ContextType, RequireFields<GQLCookQueryFindOneArgs, 'cookId'>>;
    meals?: Resolver<GQLResolversTypes['MealQuery'], ParentType, ContextType, RequireFields<GQLCookQueryMealsArgs, 'cookId'>>;
    menus?: Resolver<GQLResolversTypes['MenuQuery'], ParentType, ContextType, RequireFields<GQLCookQueryMenusArgs, 'cookId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLDateScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Date'], any> {
    name: 'Date';
}

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
    name: 'DateTime';
}

export interface GQLEmailAddressScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['EmailAddress'], any> {
    name: 'EmailAddress';
}

export type GQLEmailAddressUpdateResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['EmailAddressUpdate'] = GQLResolversParentTypes['EmailAddressUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    emailAddress?: Resolver<GQLResolversTypes['EmailAddress'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLEmailAddressUpdateMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['EmailAddressUpdateMutation'] = GQLResolversParentTypes['EmailAddressUpdateMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLEmailAddressUpdateMutationCreateOneArgs, 'emailAddress'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLEmailAddressUpdateQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['EmailAddressUpdateQuery'] = GQLResolversParentTypes['EmailAddressUpdateQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['EmailAddressUpdate']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFavoriteCookResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['FavoriteCook'] = GQLResolversParentTypes['FavoriteCook'],
> = {
    cook?: Resolver<GQLResolversTypes['Cook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFavoriteCookMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['FavoriteCookMutation'] = GQLResolversParentTypes['FavoriteCookMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLFavoriteCookQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['FavoriteCookQuery'] = GQLResolversParentTypes['FavoriteCookQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['FavoriteCook']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGenderResolvers = EnumResolverSignature<
    { DIVERSE?: any; FEMALE?: any; MALE?: any; NO_INFORMATION?: any },
    GQLResolversTypes['Gender']
>;

export type GQLKitchenResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Kitchen'] = GQLResolversParentTypes['Kitchen'],
> = {
    kitchenId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLKitchenMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['KitchenMutation'] = GQLResolversParentTypes['KitchenMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLKitchenMutationCreateOneArgs, 'request'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLKitchenQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['KitchenQuery'] = GQLResolversParentTypes['KitchenQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Kitchen']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Language'] = GQLResolversParentTypes['Language'],
> = {
    languageId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['LanguageMutation'] = GQLResolversParentTypes['LanguageMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLLanguageMutationCreateOneArgs, 'request'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['LanguageQuery'] = GQLResolversParentTypes['LanguageQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Language']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLLatitudeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Latitude'], any> {
    name: 'Latitude';
}

export type GQLLocationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Location'] = GQLResolversParentTypes['Location'],
> = {
    latitude?: Resolver<GQLResolversTypes['Latitude'], ParentType, ContextType>;
    longitude?: Resolver<GQLResolversTypes['Longitude'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLLongitudeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Longitude'], any> {
    name: 'Longitude';
}

export type GQLMealResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Meal'] = GQLResolversParentTypes['Meal'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    imageUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    mealId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<GQLResolversTypes['MealType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMealMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['MealMutation'] = GQLResolversParentTypes['MealMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLMealMutationCreateOneArgs, 'meal'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMealQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['MealQuery'] = GQLResolversParentTypes['MealQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['Meal']>>,
        ParentType,
        ContextType,
        RequireFields<GQLMealQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<Maybe<GQLResolversTypes['Meal']>, ParentType, ContextType, RequireFields<GQLMealQueryFindOneArgs, 'mealId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Menu'] = GQLResolversParentTypes['Menu'],
> = {
    basePrice?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    basePriceCustomers?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
    cook?: Resolver<GQLResolversTypes['Cook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    greetingFromKitchen?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isVisible?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    kitchen?: Resolver<Maybe<GQLResolversTypes['Kitchen']>, ParentType, ContextType>;
    kitchenId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    preparationTime?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    pricePerAdult?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    pricePerChild?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['MenuMutation'] = GQLResolversParentTypes['MenuMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLMenuMutationCreateOneArgs, 'menu'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['MenuQuery'] = GQLResolversParentTypes['MenuQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['Menu']>>,
        ParentType,
        ContextType,
        RequireFields<GQLMenuQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<Maybe<GQLResolversTypes['Menu']>, ParentType, ContextType, RequireFields<GQLMenuQueryFindOneArgs, 'menuId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation'],
> = {
    admins?: Resolver<GQLResolversTypes['AdminMutation'], ParentType, ContextType>;
    allergies?: Resolver<GQLResolversTypes['AllergyMutation'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryMutation'], ParentType, ContextType>;
    cooks?: Resolver<GQLResolversTypes['CookMutation'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenMutation'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageMutation'], ParentType, ContextType>;
    privacyPolicyUpdates?: Resolver<GQLResolversTypes['PrivacyPolicyUpdateMutation'], ParentType, ContextType>;
    sessions?: Resolver<GQLResolversTypes['SessionMutation'], ParentType, ContextType>;
    termsUpdates?: Resolver<GQLResolversTypes['TermsUpdateMutation'], ParentType, ContextType>;
    users?: Resolver<GQLResolversTypes['UserMutation'], ParentType, ContextType>;
};

export type GQLNotificationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Notification'] = GQLResolversParentTypes['Notification'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    message?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    notificationId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    url?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    wasRead?: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationConfigurationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['NotificationConfiguration'] = GQLResolversParentTypes['NotificationConfiguration'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationConfigurationMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['NotificationConfigurationMutation'] = GQLResolversParentTypes['NotificationConfigurationMutation'],
> = {
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationConfigurationQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['NotificationConfigurationQuery'] = GQLResolversParentTypes['NotificationConfigurationQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['NotificationConfiguration']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['NotificationMutation'] = GQLResolversParentTypes['NotificationMutation'],
> = {
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['NotificationQuery'] = GQLResolversParentTypes['NotificationQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Notification']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLOneTimeAccessTokenResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['OneTimeAccessToken'] = GQLResolversParentTypes['OneTimeAccessToken'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLOneTimeAccessTokenMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['OneTimeAccessTokenMutation'] = GQLResolversParentTypes['OneTimeAccessTokenMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLOneTimeAccessTokenQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['OneTimeAccessTokenQuery'] = GQLResolversParentTypes['OneTimeAccessTokenQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['OneTimeAccessToken']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPaymentQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PaymentQuery'] = GQLResolversParentTypes['PaymentQuery'],
> = {
    stripe?: Resolver<GQLResolversTypes['StripeQuery'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLPhoneNumberScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['PhoneNumber'], any> {
    name: 'PhoneNumber';
}

export type GQLPhoneNumberUpdateResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PhoneNumberUpdate'] = GQLResolversParentTypes['PhoneNumberUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    phoneNumber?: Resolver<GQLResolversTypes['PhoneNumber'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPhoneNumberUpdateMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PhoneNumberUpdateMutation'] = GQLResolversParentTypes['PhoneNumberUpdateMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLPhoneNumberUpdateMutationCreateOneArgs, 'phoneNumber'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPhoneNumberUpdateQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PhoneNumberUpdateQuery'] = GQLResolversParentTypes['PhoneNumberUpdateQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['PhoneNumberUpdate']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPriceResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Price'] = GQLResolversParentTypes['Price'],
> = {
    amount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdate'] = GQLResolversParentTypes['PrivacyPolicyUpdate'],
> = {
    admin?: Resolver<GQLResolversTypes['Admin'], ParentType, ContextType>;
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    privacyPolicyUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdateMutation'] = GQLResolversParentTypes['PrivacyPolicyUpdateMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdateQuery'] = GQLResolversParentTypes['PrivacyPolicyUpdateQuery'],
> = {
    findLatest?: Resolver<Maybe<GQLResolversTypes['PrivacyPolicyUpdate']>, ParentType, ContextType>;
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['PrivacyPolicyUpdate']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicCookResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicCook'] = GQLResolversParentTypes['PublicCook'],
> = {
    biography?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    languages?: Resolver<Array<GQLResolversTypes['Language']>, ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    maximumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumTravelDistance?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    menus?: Resolver<Array<GQLResolversTypes['PublicMenu']>, ParentType, ContextType>;
    minimumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    rank?: Resolver<GQLResolversTypes['CookRank'], ParentType, ContextType>;
    travelExpenses?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicCookQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicCookQuery'] = GQLResolversParentTypes['PublicCookQuery'],
> = {
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['PublicCook']>>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicCookQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PublicCook']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicCookQueryFindOneArgs, 'cookId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicMenuResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicMenu'] = GQLResolversParentTypes['PublicMenu'],
> = {
    basePrice?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    basePriceCustomers?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
    cook?: Resolver<GQLResolversTypes['PublicCook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    greetingFromKitchen?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    kitchen?: Resolver<Maybe<GQLResolversTypes['Kitchen']>, ParentType, ContextType>;
    kitchenId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    preparationTime?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    pricePerAdult?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    pricePerChild?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicMenuQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicMenuQuery'] = GQLResolversParentTypes['PublicMenuQuery'],
> = {
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['PublicMenu']>>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicMenuQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PublicMenu']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicMenuQueryFindOneArgs, 'menuId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicPrivacyPolicyUpdateResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicPrivacyPolicyUpdate'] = GQLResolversParentTypes['PublicPrivacyPolicyUpdate'],
> = {
    createdAt?: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicPrivacyPolicyUpdateQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicPrivacyPolicyUpdateQuery'] = GQLResolversParentTypes['PublicPrivacyPolicyUpdateQuery'],
> = {
    findLatest?: Resolver<Maybe<GQLResolversTypes['PublicPrivacyPolicyUpdate']>, ParentType, ContextType>;
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['PublicPrivacyPolicyUpdate']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicTermsUpdateResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicTermsUpdate'] = GQLResolversParentTypes['PublicTermsUpdate'],
> = {
    createdAt?: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicTermsUpdateQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicTermsUpdateQuery'] = GQLResolversParentTypes['PublicTermsUpdateQuery'],
> = {
    findLatest?: Resolver<Maybe<GQLResolversTypes['PublicTermsUpdate']>, ParentType, ContextType>;
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['PublicTermsUpdate']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicUserResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicUser'] = GQLResolversParentTypes['PublicUser'],
> = {
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    profilePictureUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query'],
> = {
    admins?: Resolver<GQLResolversTypes['AdminQuery'], ParentType, ContextType>;
    allergies?: Resolver<GQLResolversTypes['AllergyQuery'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryQuery'], ParentType, ContextType>;
    cooks?: Resolver<GQLResolversTypes['CookQuery'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenQuery'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageQuery'], ParentType, ContextType>;
    payments?: Resolver<GQLResolversTypes['PaymentQuery'], ParentType, ContextType>;
    privacyPolicyUpdates?: Resolver<GQLResolversTypes['PrivacyPolicyUpdateQuery'], ParentType, ContextType>;
    publicCooks?: Resolver<GQLResolversTypes['PublicCookQuery'], ParentType, ContextType>;
    publicMenus?: Resolver<GQLResolversTypes['PublicMenuQuery'], ParentType, ContextType>;
    publicPrivacyPolicyUpdates?: Resolver<GQLResolversTypes['PublicPrivacyPolicyUpdateQuery'], ParentType, ContextType>;
    publicTermsUpdates?: Resolver<GQLResolversTypes['PublicTermsUpdateQuery'], ParentType, ContextType>;
    status?: Resolver<GQLResolversTypes['StatusQuery'], ParentType, ContextType>;
    termsUpdates?: Resolver<GQLResolversTypes['TermsUpdateQuery'], ParentType, ContextType>;
    users?: Resolver<GQLResolversTypes['UserQuery'], ParentType, ContextType>;
};

export type GQLSessionResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Session'] = GQLResolversParentTypes['Session'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    expired?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    lastExtendedAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    platform?: Resolver<GQLResolversTypes['Platform'], ParentType, ContextType>;
    sessionId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    userId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSessionMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['SessionMutation'] = GQLResolversParentTypes['SessionMutation'],
> = {
    assignOneByEmailAddress?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLSessionMutationAssignOneByEmailAddressArgs, 'request'>
    >;
    assignOneByIdentityProvider?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLSessionMutationAssignOneByIdentityProviderArgs, 'request'>
    >;
    assignOneByPhoneNumber?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLSessionMutationAssignOneByPhoneNumberArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSessionQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['SessionQuery'] = GQLResolversParentTypes['SessionQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Session']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLStatusQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['StatusQuery'] = GQLResolversParentTypes['StatusQuery'],
> = {
    latestIosVersion?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLStripeQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['StripeQuery'] = GQLResolversParentTypes['StripeQuery'],
> = {
    publishableKey?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTermsUpdateResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['TermsUpdate'] = GQLResolversParentTypes['TermsUpdate'],
> = {
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    termsUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTermsUpdateMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['TermsUpdateMutation'] = GQLResolversParentTypes['TermsUpdateMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTermsUpdateQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['TermsUpdateQuery'] = GQLResolversParentTypes['TermsUpdateQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['TermsUpdate']>>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLUIntScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UInt'], any> {
    name: 'UInt';
}

export interface GQLUuidScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UUID'], any> {
    name: 'UUID';
}

export interface GQLUploadScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Upload'], any> {
    name: 'Upload';
}

export interface GQLUrlScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Url'], any> {
    name: 'Url';
}

export type GQLUserResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User'],
> = {
    acceptedPrivacyPolicy?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    acceptedTerms?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    addressCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    addresses?: Resolver<Array<GQLResolversTypes['Address']>, ParentType, ContextType>;
    admin?: Resolver<Maybe<GQLResolversTypes['Admin']>, ParentType, ContextType>;
    birthDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
    cook?: Resolver<Maybe<GQLResolversTypes['Cook']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    emailAddress?: Resolver<Maybe<GQLResolversTypes['EmailAddress']>, ParentType, ContextType>;
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    gender?: Resolver<GQLResolversTypes['Gender'], ParentType, ContextType>;
    isAdmin?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isCook?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    lastName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    phoneNumber?: Resolver<Maybe<GQLResolversTypes['PhoneNumber']>, ParentType, ContextType>;
    profilePictureUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['UserMutation'] = GQLResolversParentTypes['UserMutation'],
> = {
    acceptLatestPrivacyPolicy?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    acceptLatestTerms?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    addresses?: Resolver<
        GQLResolversTypes['AddressMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationAddressesArgs, 'userId'>
    >;
    createOneByEmailAddress?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationCreateOneByEmailAddressArgs, 'request'>
    >;
    createOneByIdentityProvider?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationCreateOneByIdentityProviderArgs, 'request'>
    >;
    createOneByPhoneNumber?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationCreateOneByPhoneNumberArgs, 'request'>
    >;
    emailAddressUpdates?: Resolver<
        GQLResolversTypes['EmailAddressUpdateMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationEmailAddressUpdatesArgs, 'userId'>
    >;
    favoriteCooks?: Resolver<
        GQLResolversTypes['FavoriteCookQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationFavoriteCooksArgs, 'userId'>
    >;
    lockOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLUserMutationLockOneArgs, 'userId'>>;
    notificationConfigurations?: Resolver<
        GQLResolversTypes['NotificationConfigurationMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationNotificationConfigurationsArgs, 'userId'>
    >;
    notifications?: Resolver<
        GQLResolversTypes['NotificationMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationNotificationsArgs, 'userId'>
    >;
    oneTimeAccessTokens?: Resolver<
        GQLResolversTypes['OneTimeAccessTokenMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationOneTimeAccessTokensArgs, 'userId'>
    >;
    phoneNumberUpdates?: Resolver<
        GQLResolversTypes['PhoneNumberUpdateMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationPhoneNumberUpdatesArgs, 'userId'>
    >;
    sessions?: Resolver<
        GQLResolversTypes['UserSessionMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationSessionsArgs, 'userId'>
    >;
    updateGender?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdateGenderArgs, 'gender' | 'userId'>
    >;
    updatePassword?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdatePasswordArgs, 'password' | 'userId'>
    >;
    updateProfilePicture?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdateProfilePictureArgs, 'userId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['UserQuery'] = GQLResolversParentTypes['UserQuery'],
> = {
    addresses?: Resolver<GQLResolversTypes['AddressQuery'], ParentType, ContextType, RequireFields<GQLUserQueryAddressesArgs, 'userId'>>;
    emailAddressUpdates?: Resolver<
        GQLResolversTypes['EmailAddressUpdateQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryEmailAddressUpdatesArgs, 'userId'>
    >;
    favoriteCooks?: Resolver<
        GQLResolversTypes['FavoriteCookQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryFavoriteCooksArgs, 'userId'>
    >;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['User']>>,
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, RequireFields<GQLUserQueryFindOneArgs, 'userId'>>;
    me?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, Partial<GQLUserQueryMeArgs>>;
    notificationConfigurations?: Resolver<
        GQLResolversTypes['NotificationConfigurationQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryNotificationConfigurationsArgs, 'userId'>
    >;
    notifications?: Resolver<
        GQLResolversTypes['NotificationQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryNotificationsArgs, 'userId'>
    >;
    oneTimeAccessTokens?: Resolver<
        GQLResolversTypes['OneTimeAccessTokenQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryOneTimeAccessTokensArgs, 'userId'>
    >;
    phoneNumberUpdates?: Resolver<
        GQLResolversTypes['PhoneNumberUpdateQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryPhoneNumberUpdatesArgs, 'userId'>
    >;
    sessions?: Resolver<GQLResolversTypes['SessionQuery'], ParentType, ContextType, RequireFields<GQLUserQuerySessionsArgs, 'userId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserSessionMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['UserSessionMutation'] = GQLResolversParentTypes['UserSessionMutation'],
> = {
    expireCurrent?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    expireMany?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserSessionMutationExpireManyArgs, 'request'>
    >;
    expireOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserSessionMutationExpireOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResolvers<ContextType = Context> = {
    Address?: GQLAddressResolvers<ContextType>;
    AddressMutation?: GQLAddressMutationResolvers<ContextType>;
    AddressQuery?: GQLAddressQueryResolvers<ContextType>;
    Admin?: GQLAdminResolvers<ContextType>;
    AdminMutation?: GQLAdminMutationResolvers<ContextType>;
    AdminQuery?: GQLAdminQueryResolvers<ContextType>;
    Allergy?: GQLAllergyResolvers<ContextType>;
    AllergyMutation?: GQLAllergyMutationResolvers<ContextType>;
    AllergyQuery?: GQLAllergyQueryResolvers<ContextType>;
    Category?: GQLCategoryResolvers<ContextType>;
    CategoryMutation?: GQLCategoryMutationResolvers<ContextType>;
    CategoryQuery?: GQLCategoryQueryResolvers<ContextType>;
    Cook?: GQLCookResolvers<ContextType>;
    CookMutation?: GQLCookMutationResolvers<ContextType>;
    CookQuery?: GQLCookQueryResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    EmailAddress?: GraphQLScalarType;
    EmailAddressUpdate?: GQLEmailAddressUpdateResolvers<ContextType>;
    EmailAddressUpdateMutation?: GQLEmailAddressUpdateMutationResolvers<ContextType>;
    EmailAddressUpdateQuery?: GQLEmailAddressUpdateQueryResolvers<ContextType>;
    FavoriteCook?: GQLFavoriteCookResolvers<ContextType>;
    FavoriteCookMutation?: GQLFavoriteCookMutationResolvers<ContextType>;
    FavoriteCookQuery?: GQLFavoriteCookQueryResolvers<ContextType>;
    Gender?: GQLGenderResolvers;
    Kitchen?: GQLKitchenResolvers<ContextType>;
    KitchenMutation?: GQLKitchenMutationResolvers<ContextType>;
    KitchenQuery?: GQLKitchenQueryResolvers<ContextType>;
    Language?: GQLLanguageResolvers<ContextType>;
    LanguageMutation?: GQLLanguageMutationResolvers<ContextType>;
    LanguageQuery?: GQLLanguageQueryResolvers<ContextType>;
    Latitude?: GraphQLScalarType;
    Location?: GQLLocationResolvers<ContextType>;
    Longitude?: GraphQLScalarType;
    Meal?: GQLMealResolvers<ContextType>;
    MealMutation?: GQLMealMutationResolvers<ContextType>;
    MealQuery?: GQLMealQueryResolvers<ContextType>;
    Menu?: GQLMenuResolvers<ContextType>;
    MenuMutation?: GQLMenuMutationResolvers<ContextType>;
    MenuQuery?: GQLMenuQueryResolvers<ContextType>;
    Mutation?: GQLMutationResolvers<ContextType>;
    Notification?: GQLNotificationResolvers<ContextType>;
    NotificationConfiguration?: GQLNotificationConfigurationResolvers<ContextType>;
    NotificationConfigurationMutation?: GQLNotificationConfigurationMutationResolvers<ContextType>;
    NotificationConfigurationQuery?: GQLNotificationConfigurationQueryResolvers<ContextType>;
    NotificationMutation?: GQLNotificationMutationResolvers<ContextType>;
    NotificationQuery?: GQLNotificationQueryResolvers<ContextType>;
    OneTimeAccessToken?: GQLOneTimeAccessTokenResolvers<ContextType>;
    OneTimeAccessTokenMutation?: GQLOneTimeAccessTokenMutationResolvers<ContextType>;
    OneTimeAccessTokenQuery?: GQLOneTimeAccessTokenQueryResolvers<ContextType>;
    PaymentQuery?: GQLPaymentQueryResolvers<ContextType>;
    PhoneNumber?: GraphQLScalarType;
    PhoneNumberUpdate?: GQLPhoneNumberUpdateResolvers<ContextType>;
    PhoneNumberUpdateMutation?: GQLPhoneNumberUpdateMutationResolvers<ContextType>;
    PhoneNumberUpdateQuery?: GQLPhoneNumberUpdateQueryResolvers<ContextType>;
    Price?: GQLPriceResolvers<ContextType>;
    PrivacyPolicyUpdate?: GQLPrivacyPolicyUpdateResolvers<ContextType>;
    PrivacyPolicyUpdateMutation?: GQLPrivacyPolicyUpdateMutationResolvers<ContextType>;
    PrivacyPolicyUpdateQuery?: GQLPrivacyPolicyUpdateQueryResolvers<ContextType>;
    PublicCook?: GQLPublicCookResolvers<ContextType>;
    PublicCookQuery?: GQLPublicCookQueryResolvers<ContextType>;
    PublicMenu?: GQLPublicMenuResolvers<ContextType>;
    PublicMenuQuery?: GQLPublicMenuQueryResolvers<ContextType>;
    PublicPrivacyPolicyUpdate?: GQLPublicPrivacyPolicyUpdateResolvers<ContextType>;
    PublicPrivacyPolicyUpdateQuery?: GQLPublicPrivacyPolicyUpdateQueryResolvers<ContextType>;
    PublicTermsUpdate?: GQLPublicTermsUpdateResolvers<ContextType>;
    PublicTermsUpdateQuery?: GQLPublicTermsUpdateQueryResolvers<ContextType>;
    PublicUser?: GQLPublicUserResolvers<ContextType>;
    Query?: GQLQueryResolvers<ContextType>;
    Session?: GQLSessionResolvers<ContextType>;
    SessionMutation?: GQLSessionMutationResolvers<ContextType>;
    SessionQuery?: GQLSessionQueryResolvers<ContextType>;
    StatusQuery?: GQLStatusQueryResolvers<ContextType>;
    StripeQuery?: GQLStripeQueryResolvers<ContextType>;
    TermsUpdate?: GQLTermsUpdateResolvers<ContextType>;
    TermsUpdateMutation?: GQLTermsUpdateMutationResolvers<ContextType>;
    TermsUpdateQuery?: GQLTermsUpdateQueryResolvers<ContextType>;
    UInt?: GraphQLScalarType;
    UUID?: GraphQLScalarType;
    Upload?: GraphQLScalarType;
    Url?: GraphQLScalarType;
    User?: GQLUserResolvers<ContextType>;
    UserMutation?: GQLUserMutationResolvers<ContextType>;
    UserQuery?: GQLUserQueryResolvers<ContextType>;
    UserSessionMutation?: GQLUserSessionMutationResolvers<ContextType>;
};
