import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FileUpload } from 'graphql-upload-minimal';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
    Upload: Promise<FileUpload>;
    Url: string;
};

export type GQLAdmin = {
    __typename?: 'Admin';
    adminId: Scalars['String'];
    user: GQLPublicUser;
};

export type GQLAdminMutation = {
    __typename?: 'AdminMutation';
    createOne: Scalars['Boolean'];
};

export type GQLAdminMutationCreateOneArgs = {
    request: GQLCreateOneAdminRequest;
};

export type GQLAdminQuery = {
    __typename?: 'AdminQuery';
    findMany: Array<GQLAdmin>;
    findOne?: Maybe<GQLAdmin>;
};

export type GQLAdminQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
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

export type GQLAllergyQuery = {
    __typename?: 'AllergyQuery';
    findAll: Array<GQLAllergy>;
};

export type GQLAnonymousSession = {
    __typename?: 'AnonymousSession';
    anonymousUser?: Maybe<GQLAnonymousUser>;
    platform: GQLPlatform;
    sessionId: Scalars['String'];
    userId?: Maybe<Scalars['String']>;
};

export type GQLAnonymousUser = {
    __typename?: 'AnonymousUser';
    birthDate?: Maybe<Scalars['Date']>;
    createdAt: Scalars['DateTime'];
    gender: GQLGender;
    language: GQLUserLanguage;
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

export type GQLCategoryQuery = {
    __typename?: 'CategoryQuery';
    findAll: Array<GQLCategory>;
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
    mealCount: Scalars['UInt'];
    meals: Array<GQLMeal>;
    menuCount: Scalars['UInt'];
    menus: Array<GQLMenu>;
    minimumParticipants?: Maybe<Scalars['UInt']>;
    minimumPrice?: Maybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
    user: GQLUser;
};

export type GQLCookMealMutation = {
    __typename?: 'CookMealMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    updateDescription: Scalars['Boolean'];
    updateImage: Scalars['Boolean'];
    updateTitle: Scalars['Boolean'];
    updateType: Scalars['Boolean'];
};

export type GQLCookMealMutationCreateOneArgs = {
    image?: InputMaybe<Scalars['Upload']>;
    meal: GQLCreateOneMealRequest;
};

export type GQLCookMealMutationDeleteOneArgs = {
    mealId: Scalars['String'];
};

export type GQLCookMealMutationUpdateDescriptionArgs = {
    description: Scalars['String'];
    mealId: Scalars['String'];
};

export type GQLCookMealMutationUpdateImageArgs = {
    image?: InputMaybe<Scalars['Upload']>;
    mealId: Scalars['String'];
};

export type GQLCookMealMutationUpdateTitleArgs = {
    mealId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCookMealMutationUpdateTypeArgs = {
    mealId: Scalars['String'];
    type: GQLMealType;
};

export type GQLCookMealQuery = {
    __typename?: 'CookMealQuery';
    cookId: Scalars['String'];
    findMany: Array<GQLMeal>;
    findOne?: Maybe<GQLMeal>;
};

export type GQLCookMealQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookMealQueryFindOneArgs = {
    mealId: Scalars['String'];
};

export type GQLCookMenuCourseMealOptionMutation = {
    __typename?: 'CookMenuCourseMealOptionMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    menuId: Scalars['String'];
};

export type GQLCookMenuCourseMealOptionMutationCreateOneArgs = {
    mealOption: GQLCreateOneMealOptionRequest;
};

export type GQLCookMenuCourseMealOptionQuery = {
    __typename?: 'CookMenuCourseMealOptionQuery';
    cookId: Scalars['String'];
    findMany: Array<GQLMealOption>;
    findOne?: Maybe<GQLMealOption>;
    menuId: Scalars['String'];
};

export type GQLCookMenuCourseMealOptionQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookMenuCourseMealOptionQueryFindOneArgs = {
    mealOptionId: Scalars['String'];
};

export type GQLCookMenuCourseMutation = {
    __typename?: 'CookMenuCourseMutation';
    cookId: Scalars['String'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    mealOptions: GQLCookMenuCourseMealOptionMutation;
    menuId: Scalars['String'];
};

export type GQLCookMenuCourseMutationCreateOneArgs = {
    request: GQLCreateOneCourseRequest;
};

export type GQLCookMenuCourseMutationDeleteOneArgs = {
    courseId: Scalars['String'];
};

export type GQLCookMenuCourseMutationMealOptionsArgs = {
    courseId: Scalars['String'];
};

export type GQLCookMenuCourseQuery = {
    __typename?: 'CookMenuCourseQuery';
    cookId: Scalars['String'];
    findAll: Array<GQLCourse>;
    mealOptions: GQLCookMenuCourseMealOptionQuery;
    menuId: Scalars['String'];
};

export type GQLCookMenuCourseQueryMealOptionsArgs = {
    courseId: Scalars['String'];
};

export type GQLCookMenuMutation = {
    __typename?: 'CookMenuMutation';
    cookId: Scalars['String'];
    courses: GQLCookMenuCourseMutation;
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    updateBasePrice: Scalars['Boolean'];
    updateBasePriceCustomers: Scalars['Boolean'];
    updateCurrencyCode: Scalars['Boolean'];
    updateDescription: Scalars['Boolean'];
    updateGreetingFromKitchen: Scalars['Boolean'];
    updateIsVisible: Scalars['Boolean'];
    updateKitchenId: Scalars['Boolean'];
    updatePreparationTime: Scalars['Boolean'];
    updatePricePerAdult: Scalars['Boolean'];
    updatePricePerChild: Scalars['Boolean'];
    updateTitle: Scalars['Boolean'];
};

export type GQLCookMenuMutationCoursesArgs = {
    cookId: Scalars['String'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationCreateOneArgs = {
    menu: GQLCreateOneMenuRequest;
};

export type GQLCookMenuMutationDeleteOneArgs = {
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateBasePriceArgs = {
    basePrice: Scalars['UInt'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateBasePriceCustomersArgs = {
    basePriceCustomers: Scalars['UInt'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateCurrencyCodeArgs = {
    currencyCode: GQLCurrencyCode;
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateDescriptionArgs = {
    description: Scalars['String'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateGreetingFromKitchenArgs = {
    greetingFromKitchen?: InputMaybe<Scalars['String']>;
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateIsVisibleArgs = {
    isVisible: Scalars['Boolean'];
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdateKitchenIdArgs = {
    kitchenId?: InputMaybe<Scalars['String']>;
    menuId: Scalars['String'];
};

export type GQLCookMenuMutationUpdatePreparationTimeArgs = {
    menuId: Scalars['String'];
    preparationTime: Scalars['UInt'];
};

export type GQLCookMenuMutationUpdatePricePerAdultArgs = {
    menuId: Scalars['String'];
    pricePerAdult: Scalars['UInt'];
};

export type GQLCookMenuMutationUpdatePricePerChildArgs = {
    menuId: Scalars['String'];
    pricePerChild?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMenuMutationUpdateTitleArgs = {
    menuId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCookMenuQuery = {
    __typename?: 'CookMenuQuery';
    cookId: Scalars['String'];
    courses: GQLCookMenuCourseQuery;
    findMany: Array<GQLMenu>;
    findOne?: Maybe<GQLMenu>;
};

export type GQLCookMenuQueryCoursesArgs = {
    cookId: Scalars['String'];
    menuId: Scalars['String'];
};

export type GQLCookMenuQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookMenuQueryFindOneArgs = {
    menuId: Scalars['String'];
};

export type GQLCookMutation = {
    __typename?: 'CookMutation';
    addOneLanguage: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
    meals: GQLCookMealMutation;
    menus: GQLCookMenuMutation;
    removeOneLanguage: Scalars['Boolean'];
    updateBiography: Scalars['Boolean'];
    updateIsLocked: Scalars['Boolean'];
    updateIsVisible: Scalars['Boolean'];
    updateLocation: Scalars['Boolean'];
    updateMaximumParticipants: Scalars['Boolean'];
    updateMaximumPrice: Scalars['Boolean'];
    updateMaximumTravelDistance: Scalars['Boolean'];
    updateMinimumParticipants: Scalars['Boolean'];
    updateMinimumPrice: Scalars['Boolean'];
    updateRank: Scalars['Boolean'];
    updateTravelExpenses: Scalars['Boolean'];
};

export type GQLCookMutationAddOneLanguageArgs = {
    cookId: Scalars['String'];
    languageId: Scalars['String'];
};

export type GQLCookMutationCreateOneArgs = {
    cookId: Scalars['String'];
    request: GQLCreateOneCookRequest;
};

export type GQLCookMutationMealsArgs = {
    cookId: Scalars['String'];
};

export type GQLCookMutationMenusArgs = {
    cookId: Scalars['String'];
};

export type GQLCookMutationRemoveOneLanguageArgs = {
    cookId: Scalars['String'];
    languageId: Scalars['String'];
};

export type GQLCookMutationUpdateBiographyArgs = {
    biography: Scalars['String'];
    cookId: Scalars['String'];
};

export type GQLCookMutationUpdateIsLockedArgs = {
    cookId: Scalars['String'];
    isLocked: Scalars['Boolean'];
};

export type GQLCookMutationUpdateIsVisibleArgs = {
    cookId: Scalars['String'];
    isVisible: Scalars['Boolean'];
};

export type GQLCookMutationUpdateLocationArgs = {
    cookId: Scalars['String'];
    location: GQLLocationInput;
};

export type GQLCookMutationUpdateMaximumParticipantsArgs = {
    cookId: Scalars['String'];
    maximumParticipants?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateMaximumPriceArgs = {
    cookId: Scalars['String'];
    maximumPrice?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateMaximumTravelDistanceArgs = {
    cookId: Scalars['String'];
    maximumTravelDistance?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateMinimumParticipantsArgs = {
    cookId: Scalars['String'];
    minimumParticipants?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateMinimumPriceArgs = {
    cookId: Scalars['String'];
    minimumPrice?: InputMaybe<Scalars['UInt']>;
};

export type GQLCookMutationUpdateRankArgs = {
    cookId: Scalars['String'];
    rank: GQLCookRank;
};

export type GQLCookMutationUpdateTravelExpensesArgs = {
    cookId: Scalars['String'];
    travelExpenses: Scalars['UInt'];
};

export type GQLCookQuery = {
    __typename?: 'CookQuery';
    findMany: Array<GQLCook>;
    findOne?: Maybe<GQLCook>;
    meals: GQLCookMealQuery;
    menus: GQLCookMenuQuery;
};

export type GQLCookQueryFindManyArgs = {
    request: GQLFindManyRequest;
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

export type GQLCookRank = 'HOBBY' | 'PROFESSIONAL';

export type GQLCookSpecificFee = {
    __typename?: 'CookSpecificFee';
    cookId: Scalars['String'];
};

export type GQLCookSpecificFeeMutation = {
    __typename?: 'CookSpecificFeeMutation';
    createOne: Scalars['Boolean'];
};

export type GQLCookSpecificFeeQuery = {
    __typename?: 'CookSpecificFeeQuery';
    findMany: Array<GQLCookSpecificFee>;
    findOne?: Maybe<GQLCookSpecificFee>;
};

export type GQLCookSpecificFeeQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCookSpecificFeeQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type GQLCourse = {
    __typename?: 'Course';
    cookId: Scalars['String'];
    courseId: Scalars['String'];
    index: Scalars['UInt'];
    mealOptionCount: Scalars['UInt'];
    mealOptions: Array<GQLMealOption>;
    menuId: Scalars['String'];
    title: Scalars['String'];
};

export type GQLCreateOneAdminRequest = {
    adminId: Scalars['String'];
};

export type GQLCreateOneCookRequest = {
    biography: Scalars['String'];
    isVisible: Scalars['Boolean'];
    languageIds?: InputMaybe<Array<Scalars['String']>>;
    location: GQLLocationInput;
    maximumParticipants?: InputMaybe<Scalars['UInt']>;
    maximumPrice?: InputMaybe<Scalars['UInt']>;
    maximumTravelDistance?: InputMaybe<Scalars['UInt']>;
    minimumParticipants?: InputMaybe<Scalars['UInt']>;
    minimumPrice?: InputMaybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
};

export type GQLCreateOneCourseRequest = {
    index: Scalars['UInt'];
    mealOptions?: InputMaybe<Array<GQLCreateOneMealOptionRequest>>;
    title: Scalars['String'];
};

export type GQLCreateOneMealOptionRequest = {
    index: Scalars['UInt'];
    mealId: Scalars['String'];
};

export type GQLCreateOneMealRequest = {
    description: Scalars['String'];
    title: Scalars['String'];
    type: GQLMealType;
};

export type GQLCreateOneMenuRequest = {
    basePrice: Scalars['UInt'];
    basePriceCustomers: Scalars['UInt'];
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    courses?: InputMaybe<Array<GQLCreateOneCourseRequest>>;
    currencyCode: GQLCurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen?: InputMaybe<Scalars['String']>;
    isVisible: Scalars['Boolean'];
    kitchenId?: InputMaybe<Scalars['String']>;
    preparationTime: Scalars['UInt'];
    pricePerAdult: Scalars['UInt'];
    pricePerChild?: InputMaybe<Scalars['UInt']>;
    title: Scalars['String'];
};

export type GQLCreateOneNotificationRequest = {
    message: Scalars['String'];
    url?: InputMaybe<Scalars['Url']>;
};

export type GQLCreateOnePrivacyPolicyUpdateRequest = {
    englishText: Scalars['String'];
    germanText: Scalars['String'];
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

export type GQLCreateOneTermsUpdateRequest = {
    englishText: Scalars['String'];
    germanText: Scalars['String'];
};

export type GQLCreateOneUserByEmailAddressRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<GQLCreateOneCookRequest>;
    emailAddress: Scalars['EmailAddress'];
    firstName: Scalars['String'];
    gender: GQLGender;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
    profilePictureUrl?: InputMaybe<Scalars['Url']>;
};

export type GQLCreateOneUserByIdentityProviderRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<GQLCreateOneCookRequest>;
    firstName: Scalars['String'];
    gender: GQLGender;
    idToken: Scalars['String'];
    identityProvider: GQLIdentityProvider;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    profilePictureUrl?: InputMaybe<Scalars['Url']>;
};

export type GQLCreateOneUserByPhoneNumberRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
    cook?: InputMaybe<GQLCreateOneCookRequest>;
    firstName: Scalars['String'];
    gender: GQLGender;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
    phoneNumber: Scalars['PhoneNumber'];
    profilePictureUrl?: InputMaybe<Scalars['Url']>;
};

export type GQLCurrencyCode = 'EUR' | 'USD';

export type GQLCustomerFeeUpdate = {
    __typename?: 'CustomerFeeUpdate';
    adminId: Scalars['String'];
    user: GQLPublicUser;
};

export type GQLCustomerFeeUpdateMutation = {
    __typename?: 'CustomerFeeUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type GQLCustomerFeeUpdateQuery = {
    __typename?: 'CustomerFeeUpdateQuery';
    findMany: Array<GQLAdmin>;
    findOne?: Maybe<GQLAdmin>;
};

export type GQLCustomerFeeUpdateQueryFindManyArgs = {
    request?: InputMaybe<GQLFindManyRequest>;
};

export type GQLCustomerFeeUpdateQueryFindOneArgs = {
    adminId: Scalars['String'];
};

export type GQLEmailAddressUpdate = {
    __typename?: 'EmailAddressUpdate';
    createdAt: Scalars['DateTime'];
    emailAddress: Scalars['EmailAddress'];
    userId: Scalars['String'];
};

export type GQLExpireOneSessionRequest = {
    sessionId: Scalars['String'];
    userId: Scalars['String'];
};

export type GQLFindManyPublicCooksRequest = {
    adultParticipants: Scalars['UInt'];
    categoryIds?: InputMaybe<Array<Scalars['String']>>;
    children?: InputMaybe<Scalars['UInt']>;
    dateTime: Scalars['DateTime'];
    kitchenIds?: InputMaybe<Array<Scalars['String']>>;
    location: GQLLocationInput;
    price?: InputMaybe<GQLPriceInput>;
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UInt']>;
    take?: InputMaybe<Scalars['UInt']>;
};

export type GQLFindManyRequest = {
    searchText?: InputMaybe<Scalars['String']>;
    skip?: InputMaybe<Scalars['UInt']>;
    take?: InputMaybe<Scalars['UInt']>;
};

export type GQLGender = 'DIVERSE' | 'FEMALE' | 'MALE' | 'NO_INFORMATION';

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

export type GQLKitchenQuery = {
    __typename?: 'KitchenQuery';
    findAll: Array<GQLKitchen>;
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

export type GQLLanguageQuery = {
    __typename?: 'LanguageQuery';
    findAll: Array<GQLLanguage>;
};

export type GQLLocation = {
    __typename?: 'Location';
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
};

export type GQLLocationInput = {
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    text?: InputMaybe<Scalars['String']>;
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

export type GQLMealOption = {
    __typename?: 'MealOption';
    index: Scalars['UInt'];
    meal: GQLMeal;
    mealId: Scalars['String'];
};

export type GQLMealType = 'DESSERT' | 'FISH' | 'MEAT' | 'SOUP' | 'SPECIAL' | 'VEGAN' | 'VEGETARIAN';

export type GQLMenu = {
    __typename?: 'Menu';
    basePrice: Scalars['UInt'];
    basePriceCustomers: Scalars['UInt'];
    categories: Array<GQLCategory>;
    cook: GQLCook;
    cookId: Scalars['String'];
    courseCount: Scalars['UInt'];
    courses: Array<GQLCourse>;
    createdAt: Scalars['DateTime'];
    currencyCode: GQLCurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen?: Maybe<Scalars['String']>;
    isVisible: Scalars['Boolean'];
    kitchen?: Maybe<GQLKitchen>;
    kitchenId?: Maybe<Scalars['String']>;
    menuId: Scalars['String'];
    preparationTime: Scalars['UInt'];
    pricePerAdult: Scalars['UInt'];
    pricePerChild?: Maybe<Scalars['UInt']>;
    title: Scalars['String'];
};

export type GQLMutation = {
    __typename?: 'Mutation';
    admins: GQLAdminMutation;
    allergies: GQLAllergyMutation;
    categories: GQLCategoryMutation;
    cookSpecificFees: GQLCookSpecificFeeMutation;
    cooks: GQLCookMutation;
    customerFeeUpdates: GQLCustomerFeeUpdateMutation;
    kitchens: GQLKitchenMutation;
    languages: GQLLanguageMutation;
    notifications: GQLNotificationMutation;
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
    emailsForAccount: Scalars['Boolean'];
    emailsForBookingRequests: Scalars['Boolean'];
    emailsForFavoriteCooks: Scalars['Boolean'];
    emailsForOffers: Scalars['Boolean'];
    pushesForAccount: Scalars['Boolean'];
    pushesForBookingRequests: Scalars['Boolean'];
    pushesForFavoriteCooks: Scalars['Boolean'];
    pushesForOffers: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLNotificationConfigurationMutation = {
    __typename?: 'NotificationConfigurationMutation';
    update: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLNotificationConfigurationQuery = {
    __typename?: 'NotificationConfigurationQuery';
    findOne: GQLNotificationConfiguration;
    userId: Scalars['String'];
};

export type GQLNotificationMutation = {
    __typename?: 'NotificationMutation';
    createOne: Scalars['Boolean'];
};

export type GQLNotificationMutationCreateOneArgs = {
    request: GQLCreateOneNotificationRequest;
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

export type GQLPaymentProvider = 'STRIPE';

export type GQLPhoneNumberUpdate = {
    __typename?: 'PhoneNumberUpdate';
    createdAt: Scalars['DateTime'];
    phoneNumber: Scalars['PhoneNumber'];
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
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPrivacyPolicyUpdateMutation = {
    __typename?: 'PrivacyPolicyUpdateMutation';
    createOne: Scalars['Boolean'];
};

export type GQLPrivacyPolicyUpdateMutationCreateOneArgs = {
    request: GQLCreateOnePrivacyPolicyUpdateRequest;
};

export type GQLPrivacyPolicyUpdateQuery = {
    __typename?: 'PrivacyPolicyUpdateQuery';
    findAll: Array<GQLPrivacyPolicyUpdate>;
    findLatest?: Maybe<GQLPrivacyPolicyUpdate>;
    findOne?: Maybe<GQLPrivacyPolicyUpdate>;
};

export type GQLPrivacyPolicyUpdateQueryFindOneArgs = {
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPublicCook = {
    __typename?: 'PublicCook';
    biography: Scalars['String'];
    city: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    languages: Array<GQLLanguage>;
    location: GQLLocation;
    maximumParticipants?: Maybe<Scalars['UInt']>;
    maximumPrice?: Maybe<Scalars['UInt']>;
    maximumTravelDistance?: Maybe<Scalars['UInt']>;
    minimumParticipants?: Maybe<Scalars['UInt']>;
    minimumPrice?: Maybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
    user: GQLPublicUser;
};

export type GQLPublicCookQuery = {
    __typename?: 'PublicCookQuery';
    findMany: Array<GQLPublicCook>;
    findOne?: Maybe<GQLPublicCook>;
};

export type GQLPublicCookQueryFindManyArgs = {
    request: GQLFindManyPublicCooksRequest;
};

export type GQLPublicCookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type GQLPublicPrivacyPolicyUpdate = {
    __typename?: 'PublicPrivacyPolicyUpdate';
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPublicPrivacyPolicyUpdateQuery = {
    __typename?: 'PublicPrivacyPolicyUpdateQuery';
    findAll: Array<GQLPublicPrivacyPolicyUpdate>;
    findLatest?: Maybe<GQLPublicPrivacyPolicyUpdate>;
    findOne?: Maybe<GQLPublicPrivacyPolicyUpdate>;
};

export type GQLPublicPrivacyPolicyUpdateQueryFindOneArgs = {
    privacyPolicyUpdateId: Scalars['String'];
};

export type GQLPublicTermsUpdate = {
    __typename?: 'PublicTermsUpdate';
    createdAt: Scalars['DateTime'];
    englishText: Scalars['String'];
    germanText: Scalars['String'];
    termsUpdateId: Scalars['String'];
};

export type GQLPublicTermsUpdateQuery = {
    __typename?: 'PublicTermsUpdateQuery';
    findAll: Array<GQLPublicTermsUpdate>;
    findLatest?: Maybe<GQLPublicTermsUpdate>;
    findOne?: Maybe<GQLPublicTermsUpdate>;
};

export type GQLPublicTermsUpdateQueryFindOneArgs = {
    termsUpdateId: Scalars['String'];
};

export type GQLPublicUser = {
    __typename?: 'PublicUser';
    createdAt: Scalars['DateTime'];
    firstName: Scalars['String'];
    language: GQLUserLanguage;
    profilePictureUrl?: Maybe<Scalars['Url']>;
    userId: Scalars['String'];
};

export type GQLQuery = {
    __typename?: 'Query';
    admins: GQLAdminQuery;
    allergies: GQLAllergyQuery;
    categories: GQLCategoryQuery;
    cookSpecificFees: GQLCookSpecificFeeQuery;
    cooks: GQLCookQuery;
    customerFeeUpdates: GQLCustomerFeeUpdateQuery;
    kitchens: GQLKitchenQuery;
    languages: GQLLanguageQuery;
    privacyPolicyUpdates: GQLPrivacyPolicyUpdateQuery;
    publicCooks: GQLPublicCookQuery;
    publicPrivacyPolicyUpdates: GQLPublicPrivacyPolicyUpdateQuery;
    publicTermsUpdates: GQLPublicTermsUpdateQuery;
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

export type GQLTermsUpdate = {
    __typename?: 'TermsUpdate';
    admin: GQLAdmin;
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

export type GQLTermsUpdateMutationCreateOneArgs = {
    request: GQLCreateOneTermsUpdateRequest;
};

export type GQLTermsUpdateQuery = {
    __typename?: 'TermsUpdateQuery';
    findAll: Array<GQLTermsUpdate>;
    findLatest?: Maybe<GQLTermsUpdate>;
    findOne?: Maybe<GQLTermsUpdate>;
};

export type GQLTermsUpdateQueryFindOneArgs = {
    termsUpdateId: Scalars['String'];
};

export type GQLUser = {
    __typename?: 'User';
    acceptedPrivacyPolicy: Scalars['DateTime'];
    acceptedTerms: Scalars['DateTime'];
    activeSessionCount: Scalars['UInt'];
    activeSessions: Array<GQLSession>;
    admin?: Maybe<GQLAdmin>;
    birthDate?: Maybe<Scalars['Date']>;
    cook?: Maybe<GQLCook>;
    createdAt: Scalars['DateTime'];
    emailAddress?: Maybe<Scalars['EmailAddress']>;
    emailAddressUpdate?: Maybe<GQLEmailAddressUpdate>;
    firstName: Scalars['String'];
    gender: GQLGender;
    isAdmin: Scalars['Boolean'];
    isCook: Scalars['Boolean'];
    isLocked: Scalars['Boolean'];
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    notificationConfiguration: GQLNotificationConfiguration;
    notifications: Array<GQLNotification>;
    oneTimeAccessToken?: Maybe<GQLOneTimeAccessToken>;
    phoneNumber?: Maybe<Scalars['PhoneNumber']>;
    phoneNumberUpdate?: Maybe<GQLPhoneNumberUpdate>;
    profilePictureUrl?: Maybe<Scalars['Url']>;
    unreadNotificationCount: Scalars['UInt'];
    userId: Scalars['String'];
};

export type GQLUserEmailAddressUpdateMutation = {
    __typename?: 'UserEmailAddressUpdateMutation';
    confirm: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserEmailAddressUpdateMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type GQLUserEmailAddressUpdateMutationCreateOneArgs = {
    emailAddress: Scalars['EmailAddress'];
};

export type GQLUserEmailAddressUpdateQuery = {
    __typename?: 'UserEmailAddressUpdateQuery';
    findOne?: Maybe<GQLEmailAddressUpdate>;
    userId: Scalars['String'];
};

export type GQLUserLanguage = 'ENGLISH' | 'GERMAN';

export type GQLUserMutation = {
    __typename?: 'UserMutation';
    acceptLatestPrivacyPolicy: Scalars['Boolean'];
    acceptLatestTerms: Scalars['Boolean'];
    createOneByEmailAddress: Scalars['Boolean'];
    createOneByIdentityProvider: Scalars['Boolean'];
    createOneByPhoneNumber: Scalars['Boolean'];
    emailAddressUpdate: GQLUserEmailAddressUpdateMutation;
    notificationConfiguration: GQLNotificationConfigurationMutation;
    notifications: GQLUserNotificationMutation;
    oneTimeAccessToken: GQLUserOneTimeAccessTokenMutation;
    phoneNumberUpdate: GQLUserPhoneNumberUpdateMutation;
    sessions: GQLUserSessionMutation;
    updateGender: Scalars['Boolean'];
    updateIsLocked: Scalars['Boolean'];
    updatePassword: Scalars['Boolean'];
    updateProfilePicture: Scalars['Boolean'];
};

export type GQLUserMutationCreateOneByEmailAddressArgs = {
    profilePicture?: InputMaybe<Scalars['Upload']>;
    request: GQLCreateOneUserByEmailAddressRequest;
};

export type GQLUserMutationCreateOneByIdentityProviderArgs = {
    request: GQLCreateOneUserByIdentityProviderRequest;
};

export type GQLUserMutationCreateOneByPhoneNumberArgs = {
    request: GQLCreateOneUserByPhoneNumberRequest;
};

export type GQLUserMutationEmailAddressUpdateArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationNotificationConfigurationArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationNotificationsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationOneTimeAccessTokenArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationPhoneNumberUpdateArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationSessionsArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationUpdateGenderArgs = {
    gender: GQLGender;
    userId: Scalars['String'];
};

export type GQLUserMutationUpdateIsLockedArgs = {
    isLocked: Scalars['Boolean'];
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

export type GQLUserNotificationMutation = {
    __typename?: 'UserNotificationMutation';
    deleteAll: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    updateAllWasRead: Scalars['Boolean'];
    updateOneWasRead: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserNotificationMutationDeleteOneArgs = {
    notificationId: Scalars['String'];
};

export type GQLUserNotificationMutationUpdateAllWasReadArgs = {
    wasRead: Scalars['Boolean'];
};

export type GQLUserNotificationMutationUpdateOneWasReadArgs = {
    notificationId: Scalars['String'];
    wasRead: Scalars['Boolean'];
};

export type GQLUserOneTimeAccessTokenMutation = {
    __typename?: 'UserOneTimeAccessTokenMutation';
    confirm: Scalars['Boolean'];
    createOneForEmailAddress: Scalars['Boolean'];
    createOneForPhoneNumber: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserOneTimeAccessTokenMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type GQLUserOneTimeAccessTokenMutationCreateOneForEmailAddressArgs = {
    emailAddress: Scalars['EmailAddress'];
};

export type GQLUserOneTimeAccessTokenMutationCreateOneForPhoneNumberArgs = {
    phoneNumber: Scalars['PhoneNumber'];
};

export type GQLUserOneTimeAccessTokenQuery = {
    __typename?: 'UserOneTimeAccessTokenQuery';
    findOne?: Maybe<GQLOneTimeAccessToken>;
    userId: Scalars['String'];
};

export type GQLUserPhoneNumberUpdateMutation = {
    __typename?: 'UserPhoneNumberUpdateMutation';
    confirm: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
    deleteOne: Scalars['Boolean'];
    userId: Scalars['String'];
};

export type GQLUserPhoneNumberUpdateMutationConfirmArgs = {
    secret: Scalars['String'];
};

export type GQLUserPhoneNumberUpdateMutationCreateOneArgs = {
    phoneNumber: Scalars['PhoneNumber'];
};

export type GQLUserPhoneNumberUpdateQuery = {
    __typename?: 'UserPhoneNumberUpdateQuery';
    findOne?: Maybe<GQLPhoneNumberUpdate>;
    userId: Scalars['String'];
};

export type GQLUserQuery = {
    __typename?: 'UserQuery';
    emailAddressUpdate: GQLUserEmailAddressUpdateQuery;
    findMany?: Maybe<Array<GQLUser>>;
    findOne?: Maybe<GQLUser>;
    me?: Maybe<GQLUser>;
    notificationConfiguration?: Maybe<GQLNotificationConfigurationQuery>;
    notifications: GQLNotificationQuery;
    oneTimeAccessToken: GQLUserOneTimeAccessTokenQuery;
    phoneNumberUpdate: GQLUserPhoneNumberUpdateQuery;
    sessions: GQLUserSessionQuery;
};

export type GQLUserQueryEmailAddressUpdateArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryFindManyArgs = {
    request: GQLFindManyRequest;
};

export type GQLUserQueryFindOneArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryNotificationConfigurationArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryNotificationsArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryOneTimeAccessTokenArgs = {
    userId: Scalars['String'];
};

export type GQLUserQueryPhoneNumberUpdateArgs = {
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
    userId: Scalars['String'];
};

export type GQLUserSessionMutationExpireManyArgs = {
    request: Array<Scalars['String']>;
};

export type GQLUserSessionMutationExpireOneArgs = {
    request: GQLExpireOneSessionRequest;
};

export type GQLUserSessionQuery = {
    __typename?: 'UserSessionQuery';
    findMany?: Maybe<Array<GQLSession>>;
    userId: Scalars['String'];
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
    Admin: ResolverTypeWrapper<GQLAdmin>;
    AdminMutation: ResolverTypeWrapper<GQLAdminMutation>;
    AdminQuery: ResolverTypeWrapper<GQLAdminQuery>;
    Allergy: ResolverTypeWrapper<GQLAllergy>;
    AllergyMutation: ResolverTypeWrapper<GQLAllergyMutation>;
    AllergyQuery: ResolverTypeWrapper<GQLAllergyQuery>;
    AnonymousSession: ResolverTypeWrapper<GQLAnonymousSession>;
    AnonymousUser: ResolverTypeWrapper<GQLAnonymousUser>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Category: ResolverTypeWrapper<GQLCategory>;
    CategoryMutation: ResolverTypeWrapper<GQLCategoryMutation>;
    CategoryQuery: ResolverTypeWrapper<GQLCategoryQuery>;
    Cook: ResolverTypeWrapper<GQLCook>;
    CookMealMutation: ResolverTypeWrapper<GQLCookMealMutation>;
    CookMealQuery: ResolverTypeWrapper<GQLCookMealQuery>;
    CookMenuCourseMealOptionMutation: ResolverTypeWrapper<GQLCookMenuCourseMealOptionMutation>;
    CookMenuCourseMealOptionQuery: ResolverTypeWrapper<GQLCookMenuCourseMealOptionQuery>;
    CookMenuCourseMutation: ResolverTypeWrapper<GQLCookMenuCourseMutation>;
    CookMenuCourseQuery: ResolverTypeWrapper<GQLCookMenuCourseQuery>;
    CookMenuMutation: ResolverTypeWrapper<GQLCookMenuMutation>;
    CookMenuQuery: ResolverTypeWrapper<GQLCookMenuQuery>;
    CookMutation: ResolverTypeWrapper<GQLCookMutation>;
    CookQuery: ResolverTypeWrapper<GQLCookQuery>;
    CookRank: GQLCookRank;
    CookSpecificFee: ResolverTypeWrapper<GQLCookSpecificFee>;
    CookSpecificFeeMutation: ResolverTypeWrapper<GQLCookSpecificFeeMutation>;
    CookSpecificFeeQuery: ResolverTypeWrapper<GQLCookSpecificFeeQuery>;
    Course: ResolverTypeWrapper<GQLCourse>;
    CreateOneAdminRequest: GQLCreateOneAdminRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
    CreateOneCourseRequest: GQLCreateOneCourseRequest;
    CreateOneMealOptionRequest: GQLCreateOneMealOptionRequest;
    CreateOneMealRequest: GQLCreateOneMealRequest;
    CreateOneMenuRequest: GQLCreateOneMenuRequest;
    CreateOneNotificationRequest: GQLCreateOneNotificationRequest;
    CreateOnePrivacyPolicyUpdateRequest: GQLCreateOnePrivacyPolicyUpdateRequest;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneTermsUpdateRequest: GQLCreateOneTermsUpdateRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    CurrencyCode: GQLCurrencyCode;
    CustomerFeeUpdate: ResolverTypeWrapper<GQLCustomerFeeUpdate>;
    CustomerFeeUpdateMutation: ResolverTypeWrapper<GQLCustomerFeeUpdateMutation>;
    CustomerFeeUpdateQuery: ResolverTypeWrapper<GQLCustomerFeeUpdateQuery>;
    Date: ResolverTypeWrapper<Scalars['Date']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
    EmailAddressUpdate: ResolverTypeWrapper<GQLEmailAddressUpdate>;
    ExpireOneSessionRequest: GQLExpireOneSessionRequest;
    FindManyPublicCooksRequest: GQLFindManyPublicCooksRequest;
    FindManyRequest: GQLFindManyRequest;
    Gender: GQLGender;
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
    MealOption: ResolverTypeWrapper<GQLMealOption>;
    MealType: GQLMealType;
    Menu: ResolverTypeWrapper<GQLMenu>;
    Mutation: ResolverTypeWrapper<{}>;
    Notification: ResolverTypeWrapper<GQLNotification>;
    NotificationConfiguration: ResolverTypeWrapper<GQLNotificationConfiguration>;
    NotificationConfigurationMutation: ResolverTypeWrapper<GQLNotificationConfigurationMutation>;
    NotificationConfigurationQuery: ResolverTypeWrapper<GQLNotificationConfigurationQuery>;
    NotificationMutation: ResolverTypeWrapper<GQLNotificationMutation>;
    NotificationQuery: ResolverTypeWrapper<GQLNotificationQuery>;
    OneTimeAccessToken: ResolverTypeWrapper<GQLOneTimeAccessToken>;
    PaymentProvider: GQLPaymentProvider;
    PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
    PhoneNumberUpdate: ResolverTypeWrapper<GQLPhoneNumberUpdate>;
    Platform: GQLPlatform;
    Price: ResolverTypeWrapper<GQLPrice>;
    PriceInput: GQLPriceInput;
    PrivacyPolicyUpdate: ResolverTypeWrapper<GQLPrivacyPolicyUpdate>;
    PrivacyPolicyUpdateMutation: ResolverTypeWrapper<GQLPrivacyPolicyUpdateMutation>;
    PrivacyPolicyUpdateQuery: ResolverTypeWrapper<GQLPrivacyPolicyUpdateQuery>;
    PublicCook: ResolverTypeWrapper<GQLPublicCook>;
    PublicCookQuery: ResolverTypeWrapper<GQLPublicCookQuery>;
    PublicPrivacyPolicyUpdate: ResolverTypeWrapper<GQLPublicPrivacyPolicyUpdate>;
    PublicPrivacyPolicyUpdateQuery: ResolverTypeWrapper<GQLPublicPrivacyPolicyUpdateQuery>;
    PublicTermsUpdate: ResolverTypeWrapper<GQLPublicTermsUpdate>;
    PublicTermsUpdateQuery: ResolverTypeWrapper<GQLPublicTermsUpdateQuery>;
    PublicUser: ResolverTypeWrapper<GQLPublicUser>;
    Query: ResolverTypeWrapper<{}>;
    Session: ResolverTypeWrapper<GQLSession>;
    SessionMutation: ResolverTypeWrapper<GQLSessionMutation>;
    String: ResolverTypeWrapper<Scalars['String']>;
    TermsUpdate: ResolverTypeWrapper<GQLTermsUpdate>;
    TermsUpdateMutation: ResolverTypeWrapper<GQLTermsUpdateMutation>;
    TermsUpdateQuery: ResolverTypeWrapper<GQLTermsUpdateQuery>;
    UInt: ResolverTypeWrapper<Scalars['UInt']>;
    UUID: ResolverTypeWrapper<Scalars['UUID']>;
    Upload: ResolverTypeWrapper<Scalars['Upload']>;
    Url: ResolverTypeWrapper<Scalars['Url']>;
    User: ResolverTypeWrapper<GQLUser>;
    UserEmailAddressUpdateMutation: ResolverTypeWrapper<GQLUserEmailAddressUpdateMutation>;
    UserEmailAddressUpdateQuery: ResolverTypeWrapper<GQLUserEmailAddressUpdateQuery>;
    UserLanguage: GQLUserLanguage;
    UserMutation: ResolverTypeWrapper<GQLUserMutation>;
    UserNotificationMutation: ResolverTypeWrapper<GQLUserNotificationMutation>;
    UserOneTimeAccessTokenMutation: ResolverTypeWrapper<GQLUserOneTimeAccessTokenMutation>;
    UserOneTimeAccessTokenQuery: ResolverTypeWrapper<GQLUserOneTimeAccessTokenQuery>;
    UserPhoneNumberUpdateMutation: ResolverTypeWrapper<GQLUserPhoneNumberUpdateMutation>;
    UserPhoneNumberUpdateQuery: ResolverTypeWrapper<GQLUserPhoneNumberUpdateQuery>;
    UserQuery: ResolverTypeWrapper<GQLUserQuery>;
    UserSessionMutation: ResolverTypeWrapper<GQLUserSessionMutation>;
    UserSessionQuery: ResolverTypeWrapper<GQLUserSessionQuery>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
    Admin: GQLAdmin;
    AdminMutation: GQLAdminMutation;
    AdminQuery: GQLAdminQuery;
    Allergy: GQLAllergy;
    AllergyMutation: GQLAllergyMutation;
    AllergyQuery: GQLAllergyQuery;
    AnonymousSession: GQLAnonymousSession;
    AnonymousUser: GQLAnonymousUser;
    Boolean: Scalars['Boolean'];
    Category: GQLCategory;
    CategoryMutation: GQLCategoryMutation;
    CategoryQuery: GQLCategoryQuery;
    Cook: GQLCook;
    CookMealMutation: GQLCookMealMutation;
    CookMealQuery: GQLCookMealQuery;
    CookMenuCourseMealOptionMutation: GQLCookMenuCourseMealOptionMutation;
    CookMenuCourseMealOptionQuery: GQLCookMenuCourseMealOptionQuery;
    CookMenuCourseMutation: GQLCookMenuCourseMutation;
    CookMenuCourseQuery: GQLCookMenuCourseQuery;
    CookMenuMutation: GQLCookMenuMutation;
    CookMenuQuery: GQLCookMenuQuery;
    CookMutation: GQLCookMutation;
    CookQuery: GQLCookQuery;
    CookSpecificFee: GQLCookSpecificFee;
    CookSpecificFeeMutation: GQLCookSpecificFeeMutation;
    CookSpecificFeeQuery: GQLCookSpecificFeeQuery;
    Course: GQLCourse;
    CreateOneAdminRequest: GQLCreateOneAdminRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
    CreateOneCourseRequest: GQLCreateOneCourseRequest;
    CreateOneMealOptionRequest: GQLCreateOneMealOptionRequest;
    CreateOneMealRequest: GQLCreateOneMealRequest;
    CreateOneMenuRequest: GQLCreateOneMenuRequest;
    CreateOneNotificationRequest: GQLCreateOneNotificationRequest;
    CreateOnePrivacyPolicyUpdateRequest: GQLCreateOnePrivacyPolicyUpdateRequest;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneTermsUpdateRequest: GQLCreateOneTermsUpdateRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    CustomerFeeUpdate: GQLCustomerFeeUpdate;
    CustomerFeeUpdateMutation: GQLCustomerFeeUpdateMutation;
    CustomerFeeUpdateQuery: GQLCustomerFeeUpdateQuery;
    Date: Scalars['Date'];
    DateTime: Scalars['DateTime'];
    EmailAddress: Scalars['EmailAddress'];
    EmailAddressUpdate: GQLEmailAddressUpdate;
    ExpireOneSessionRequest: GQLExpireOneSessionRequest;
    FindManyPublicCooksRequest: GQLFindManyPublicCooksRequest;
    FindManyRequest: GQLFindManyRequest;
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
    MealOption: GQLMealOption;
    Menu: GQLMenu;
    Mutation: {};
    Notification: GQLNotification;
    NotificationConfiguration: GQLNotificationConfiguration;
    NotificationConfigurationMutation: GQLNotificationConfigurationMutation;
    NotificationConfigurationQuery: GQLNotificationConfigurationQuery;
    NotificationMutation: GQLNotificationMutation;
    NotificationQuery: GQLNotificationQuery;
    OneTimeAccessToken: GQLOneTimeAccessToken;
    PhoneNumber: Scalars['PhoneNumber'];
    PhoneNumberUpdate: GQLPhoneNumberUpdate;
    Price: GQLPrice;
    PriceInput: GQLPriceInput;
    PrivacyPolicyUpdate: GQLPrivacyPolicyUpdate;
    PrivacyPolicyUpdateMutation: GQLPrivacyPolicyUpdateMutation;
    PrivacyPolicyUpdateQuery: GQLPrivacyPolicyUpdateQuery;
    PublicCook: GQLPublicCook;
    PublicCookQuery: GQLPublicCookQuery;
    PublicPrivacyPolicyUpdate: GQLPublicPrivacyPolicyUpdate;
    PublicPrivacyPolicyUpdateQuery: GQLPublicPrivacyPolicyUpdateQuery;
    PublicTermsUpdate: GQLPublicTermsUpdate;
    PublicTermsUpdateQuery: GQLPublicTermsUpdateQuery;
    PublicUser: GQLPublicUser;
    Query: {};
    Session: GQLSession;
    SessionMutation: GQLSessionMutation;
    String: Scalars['String'];
    TermsUpdate: GQLTermsUpdate;
    TermsUpdateMutation: GQLTermsUpdateMutation;
    TermsUpdateQuery: GQLTermsUpdateQuery;
    UInt: Scalars['UInt'];
    UUID: Scalars['UUID'];
    Upload: Scalars['Upload'];
    Url: Scalars['Url'];
    User: GQLUser;
    UserEmailAddressUpdateMutation: GQLUserEmailAddressUpdateMutation;
    UserEmailAddressUpdateQuery: GQLUserEmailAddressUpdateQuery;
    UserMutation: GQLUserMutation;
    UserNotificationMutation: GQLUserNotificationMutation;
    UserOneTimeAccessTokenMutation: GQLUserOneTimeAccessTokenMutation;
    UserOneTimeAccessTokenQuery: GQLUserOneTimeAccessTokenQuery;
    UserPhoneNumberUpdateMutation: GQLUserPhoneNumberUpdateMutation;
    UserPhoneNumberUpdateQuery: GQLUserPhoneNumberUpdateQuery;
    UserQuery: GQLUserQuery;
    UserSessionMutation: GQLUserSessionMutation;
    UserSessionQuery: GQLUserSessionQuery;
};

export type GQLAdminResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Admin'] = GQLResolversParentTypes['Admin']> = {
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AdminMutation'] = GQLResolversParentTypes['AdminMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLAdminMutationCreateOneArgs, 'request'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAdminQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AdminQuery'] = GQLResolversParentTypes['AdminQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['Admin']>, ParentType, ContextType, Partial<GQLAdminQueryFindManyArgs>>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Admin']>, ParentType, ContextType, RequireFields<GQLAdminQueryFindOneArgs, 'adminId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Allergy'] = GQLResolversParentTypes['Allergy'],
> = {
    allergyId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AllergyMutation'] = GQLResolversParentTypes['AllergyMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAllergyQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AllergyQuery'] = GQLResolversParentTypes['AllergyQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Allergy']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAnonymousSessionResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AnonymousSession'] = GQLResolversParentTypes['AnonymousSession'],
> = {
    anonymousUser?: Resolver<Maybe<GQLResolversTypes['AnonymousUser']>, ParentType, ContextType>;
    platform?: Resolver<GQLResolversTypes['Platform'], ParentType, ContextType>;
    sessionId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    userId?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLAnonymousUserResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['AnonymousUser'] = GQLResolversParentTypes['AnonymousUser'],
> = {
    birthDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    gender?: Resolver<GQLResolversTypes['Gender'], ParentType, ContextType>;
    language?: Resolver<GQLResolversTypes['UserLanguage'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Category'] = GQLResolversParentTypes['Category'],
> = {
    categoryId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CategoryMutation'] = GQLResolversParentTypes['CategoryMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCategoryQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CategoryQuery'] = GQLResolversParentTypes['CategoryQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Cook'] = GQLResolversParentTypes['Cook']> = {
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
    mealCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    meals?: Resolver<Array<GQLResolversTypes['Meal']>, ParentType, ContextType>;
    menuCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    menus?: Resolver<Array<GQLResolversTypes['Menu']>, ParentType, ContextType>;
    minimumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    rank?: Resolver<GQLResolversTypes['CookRank'], ParentType, ContextType>;
    travelExpenses?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMealMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMealMutation'] = GQLResolversParentTypes['CookMealMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMealMutationCreateOneArgs, 'meal'>>;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMealMutationDeleteOneArgs, 'mealId'>>;
    updateDescription?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationUpdateDescriptionArgs, 'description' | 'mealId'>
    >;
    updateImage?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationUpdateImageArgs, 'mealId'>
    >;
    updateTitle?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationUpdateTitleArgs, 'mealId' | 'title'>
    >;
    updateType?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMealMutationUpdateTypeArgs, 'mealId' | 'type'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMealQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMealQuery'] = GQLResolversParentTypes['CookMealQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<Array<GQLResolversTypes['Meal']>, ParentType, ContextType, Partial<GQLCookMealQueryFindManyArgs>>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Meal']>, ParentType, ContextType, RequireFields<GQLCookMealQueryFindOneArgs, 'mealId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuCourseMealOptionMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuCourseMealOptionMutation'] = GQLResolversParentTypes['CookMenuCourseMealOptionMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMealOptionMutationCreateOneArgs, 'mealOption'>
    >;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuCourseMealOptionQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuCourseMealOptionQuery'] = GQLResolversParentTypes['CookMenuCourseMealOptionQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findMany?: Resolver<
        Array<GQLResolversTypes['MealOption']>,
        ParentType,
        ContextType,
        Partial<GQLCookMenuCourseMealOptionQueryFindManyArgs>
    >;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['MealOption']>,
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMealOptionQueryFindOneArgs, 'mealOptionId'>
    >;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuCourseMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuCourseMutation'] = GQLResolversParentTypes['CookMenuCourseMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMutationCreateOneArgs, 'request'>
    >;
    deleteOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMutationDeleteOneArgs, 'courseId'>
    >;
    mealOptions?: Resolver<
        GQLResolversTypes['CookMenuCourseMealOptionMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseMutationMealOptionsArgs, 'courseId'>
    >;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuCourseQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuCourseQuery'] = GQLResolversParentTypes['CookMenuCourseQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    findAll?: Resolver<Array<GQLResolversTypes['Course']>, ParentType, ContextType>;
    mealOptions?: Resolver<
        GQLResolversTypes['CookMenuCourseMealOptionQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuCourseQueryMealOptionsArgs, 'courseId'>
    >;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuMutation'] = GQLResolversParentTypes['CookMenuMutation'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courses?: Resolver<
        GQLResolversTypes['CookMenuCourseMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationCoursesArgs, 'cookId' | 'menuId'>
    >;
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMenuMutationCreateOneArgs, 'menu'>>;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMenuMutationDeleteOneArgs, 'menuId'>>;
    updateBasePrice?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateBasePriceArgs, 'basePrice' | 'menuId'>
    >;
    updateBasePriceCustomers?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateBasePriceCustomersArgs, 'basePriceCustomers' | 'menuId'>
    >;
    updateCurrencyCode?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateCurrencyCodeArgs, 'currencyCode' | 'menuId'>
    >;
    updateDescription?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateDescriptionArgs, 'description' | 'menuId'>
    >;
    updateGreetingFromKitchen?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateGreetingFromKitchenArgs, 'menuId'>
    >;
    updateIsVisible?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateIsVisibleArgs, 'isVisible' | 'menuId'>
    >;
    updateKitchenId?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateKitchenIdArgs, 'menuId'>
    >;
    updatePreparationTime?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdatePreparationTimeArgs, 'menuId' | 'preparationTime'>
    >;
    updatePricePerAdult?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdatePricePerAdultArgs, 'menuId' | 'pricePerAdult'>
    >;
    updatePricePerChild?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdatePricePerChildArgs, 'menuId'>
    >;
    updateTitle?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuMutationUpdateTitleArgs, 'menuId' | 'title'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMenuQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMenuQuery'] = GQLResolversParentTypes['CookMenuQuery'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courses?: Resolver<
        GQLResolversTypes['CookMenuCourseQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMenuQueryCoursesArgs, 'cookId' | 'menuId'>
    >;
    findMany?: Resolver<Array<GQLResolversTypes['Menu']>, ParentType, ContextType, Partial<GQLCookMenuQueryFindManyArgs>>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Menu']>, ParentType, ContextType, RequireFields<GQLCookMenuQueryFindOneArgs, 'menuId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookMutation'] = GQLResolversParentTypes['CookMutation'],
> = {
    addOneLanguage?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationAddOneLanguageArgs, 'cookId' | 'languageId'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationCreateOneArgs, 'cookId' | 'request'>
    >;
    meals?: Resolver<GQLResolversTypes['CookMealMutation'], ParentType, ContextType, RequireFields<GQLCookMutationMealsArgs, 'cookId'>>;
    menus?: Resolver<GQLResolversTypes['CookMenuMutation'], ParentType, ContextType, RequireFields<GQLCookMutationMenusArgs, 'cookId'>>;
    removeOneLanguage?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationRemoveOneLanguageArgs, 'cookId' | 'languageId'>
    >;
    updateBiography?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateBiographyArgs, 'biography' | 'cookId'>
    >;
    updateIsLocked?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateIsLockedArgs, 'cookId' | 'isLocked'>
    >;
    updateIsVisible?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateIsVisibleArgs, 'cookId' | 'isVisible'>
    >;
    updateLocation?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateLocationArgs, 'cookId' | 'location'>
    >;
    updateMaximumParticipants?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMaximumParticipantsArgs, 'cookId'>
    >;
    updateMaximumPrice?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMaximumPriceArgs, 'cookId'>
    >;
    updateMaximumTravelDistance?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMaximumTravelDistanceArgs, 'cookId'>
    >;
    updateMinimumParticipants?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMinimumParticipantsArgs, 'cookId'>
    >;
    updateMinimumPrice?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateMinimumPriceArgs, 'cookId'>
    >;
    updateRank?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateRankArgs, 'cookId' | 'rank'>
    >;
    updateTravelExpenses?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLCookMutationUpdateTravelExpensesArgs, 'cookId' | 'travelExpenses'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookQuery'] = GQLResolversParentTypes['CookQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['Cook']>, ParentType, ContextType, RequireFields<GQLCookQueryFindManyArgs, 'request'>>;
    findOne?: Resolver<Maybe<GQLResolversTypes['Cook']>, ParentType, ContextType, RequireFields<GQLCookQueryFindOneArgs, 'cookId'>>;
    meals?: Resolver<GQLResolversTypes['CookMealQuery'], ParentType, ContextType, RequireFields<GQLCookQueryMealsArgs, 'cookId'>>;
    menus?: Resolver<GQLResolversTypes['CookMenuQuery'], ParentType, ContextType, RequireFields<GQLCookQueryMenusArgs, 'cookId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookSpecificFeeResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookSpecificFee'] = GQLResolversParentTypes['CookSpecificFee'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookSpecificFeeMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookSpecificFeeMutation'] = GQLResolversParentTypes['CookSpecificFeeMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookSpecificFeeQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CookSpecificFeeQuery'] = GQLResolversParentTypes['CookSpecificFeeQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['CookSpecificFee']>, ParentType, ContextType, Partial<GQLCookSpecificFeeQueryFindManyArgs>>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['CookSpecificFee']>,
        ParentType,
        ContextType,
        RequireFields<GQLCookSpecificFeeQueryFindOneArgs, 'cookId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCourseResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Course'] = GQLResolversParentTypes['Course'],
> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courseId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    index?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    mealOptionCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    mealOptions?: Resolver<Array<GQLResolversTypes['MealOption']>, ParentType, ContextType>;
    menuId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCustomerFeeUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CustomerFeeUpdate'] = GQLResolversParentTypes['CustomerFeeUpdate'],
> = {
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCustomerFeeUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CustomerFeeUpdateMutation'] = GQLResolversParentTypes['CustomerFeeUpdateMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCustomerFeeUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['CustomerFeeUpdateQuery'] = GQLResolversParentTypes['CustomerFeeUpdateQuery'],
> = {
    findMany?: Resolver<Array<GQLResolversTypes['Admin']>, ParentType, ContextType, Partial<GQLCustomerFeeUpdateQueryFindManyArgs>>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['Admin']>,
        ParentType,
        ContextType,
        RequireFields<GQLCustomerFeeUpdateQueryFindOneArgs, 'adminId'>
    >;
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
    ContextType = any,
    ParentType extends GQLResolversParentTypes['EmailAddressUpdate'] = GQLResolversParentTypes['EmailAddressUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    emailAddress?: Resolver<GQLResolversTypes['EmailAddress'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLKitchenResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Kitchen'] = GQLResolversParentTypes['Kitchen'],
> = {
    kitchenId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLKitchenMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['KitchenMutation'] = GQLResolversParentTypes['KitchenMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLKitchenQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['KitchenQuery'] = GQLResolversParentTypes['KitchenQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Kitchen']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Language'] = GQLResolversParentTypes['Language'],
> = {
    languageId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['LanguageMutation'] = GQLResolversParentTypes['LanguageMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLLanguageQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['LanguageQuery'] = GQLResolversParentTypes['LanguageQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['Language']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLLatitudeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Latitude'], any> {
    name: 'Latitude';
}

export type GQLLocationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Location'] = GQLResolversParentTypes['Location'],
> = {
    latitude?: Resolver<GQLResolversTypes['Latitude'], ParentType, ContextType>;
    longitude?: Resolver<GQLResolversTypes['Longitude'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLLongitudeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Longitude'], any> {
    name: 'Longitude';
}

export type GQLMealResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Meal'] = GQLResolversParentTypes['Meal']> = {
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    imageUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    mealId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    title?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    type?: Resolver<GQLResolversTypes['MealType'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMealOptionResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['MealOption'] = GQLResolversParentTypes['MealOption'],
> = {
    index?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    meal?: Resolver<GQLResolversTypes['Meal'], ParentType, ContextType>;
    mealId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLMenuResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Menu'] = GQLResolversParentTypes['Menu']> = {
    basePrice?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    basePriceCustomers?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    categories?: Resolver<Array<GQLResolversTypes['Category']>, ParentType, ContextType>;
    cook?: Resolver<GQLResolversTypes['Cook'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    courseCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    courses?: Resolver<Array<GQLResolversTypes['Course']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    greetingFromKitchen?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
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

export type GQLMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation'],
> = {
    admins?: Resolver<GQLResolversTypes['AdminMutation'], ParentType, ContextType>;
    allergies?: Resolver<GQLResolversTypes['AllergyMutation'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryMutation'], ParentType, ContextType>;
    cookSpecificFees?: Resolver<GQLResolversTypes['CookSpecificFeeMutation'], ParentType, ContextType>;
    cooks?: Resolver<GQLResolversTypes['CookMutation'], ParentType, ContextType>;
    customerFeeUpdates?: Resolver<GQLResolversTypes['CustomerFeeUpdateMutation'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenMutation'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageMutation'], ParentType, ContextType>;
    notifications?: Resolver<GQLResolversTypes['NotificationMutation'], ParentType, ContextType>;
    privacyPolicyUpdates?: Resolver<GQLResolversTypes['PrivacyPolicyUpdateMutation'], ParentType, ContextType>;
    sessions?: Resolver<GQLResolversTypes['SessionMutation'], ParentType, ContextType>;
    termsUpdates?: Resolver<GQLResolversTypes['TermsUpdateMutation'], ParentType, ContextType>;
    users?: Resolver<GQLResolversTypes['UserMutation'], ParentType, ContextType>;
};

export type GQLNotificationResolvers<
    ContextType = any,
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
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationConfiguration'] = GQLResolversParentTypes['NotificationConfiguration'],
> = {
    emailsForAccount?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    emailsForBookingRequests?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    emailsForFavoriteCooks?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    emailsForOffers?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    pushesForAccount?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    pushesForBookingRequests?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    pushesForFavoriteCooks?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    pushesForOffers?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationConfigurationMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationConfigurationMutation'] = GQLResolversParentTypes['NotificationConfigurationMutation'],
> = {
    update?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationConfigurationQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationConfigurationQuery'] = GQLResolversParentTypes['NotificationConfigurationQuery'],
> = {
    findOne?: Resolver<GQLResolversTypes['NotificationConfiguration'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationMutation'] = GQLResolversParentTypes['NotificationMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLNotificationMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLNotificationQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['NotificationQuery'] = GQLResolversParentTypes['NotificationQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Notification']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLOneTimeAccessTokenResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['OneTimeAccessToken'] = GQLResolversParentTypes['OneTimeAccessToken'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLPhoneNumberScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['PhoneNumber'], any> {
    name: 'PhoneNumber';
}

export type GQLPhoneNumberUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PhoneNumberUpdate'] = GQLResolversParentTypes['PhoneNumberUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    phoneNumber?: Resolver<GQLResolversTypes['PhoneNumber'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPriceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Price'] = GQLResolversParentTypes['Price']> = {
    amount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdate'] = GQLResolversParentTypes['PrivacyPolicyUpdate'],
> = {
    admin?: Resolver<GQLResolversTypes['Admin'], ParentType, ContextType>;
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    privacyPolicyUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdateMutation'] = GQLResolversParentTypes['PrivacyPolicyUpdateMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLPrivacyPolicyUpdateMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPrivacyPolicyUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PrivacyPolicyUpdateQuery'] = GQLResolversParentTypes['PrivacyPolicyUpdateQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['PrivacyPolicyUpdate']>, ParentType, ContextType>;
    findLatest?: Resolver<Maybe<GQLResolversTypes['PrivacyPolicyUpdate']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PrivacyPolicyUpdate']>,
        ParentType,
        ContextType,
        RequireFields<GQLPrivacyPolicyUpdateQueryFindOneArgs, 'privacyPolicyUpdateId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicCookResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicCook'] = GQLResolversParentTypes['PublicCook'],
> = {
    biography?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    city?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    languages?: Resolver<Array<GQLResolversTypes['Language']>, ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    maximumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumTravelDistance?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    rank?: Resolver<GQLResolversTypes['CookRank'], ParentType, ContextType>;
    travelExpenses?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['PublicUser'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicCookQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicCookQuery'] = GQLResolversParentTypes['PublicCookQuery'],
> = {
    findMany?: Resolver<
        Array<GQLResolversTypes['PublicCook']>,
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

export type GQLPublicPrivacyPolicyUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicPrivacyPolicyUpdate'] = GQLResolversParentTypes['PublicPrivacyPolicyUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    privacyPolicyUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicPrivacyPolicyUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicPrivacyPolicyUpdateQuery'] = GQLResolversParentTypes['PublicPrivacyPolicyUpdateQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['PublicPrivacyPolicyUpdate']>, ParentType, ContextType>;
    findLatest?: Resolver<Maybe<GQLResolversTypes['PublicPrivacyPolicyUpdate']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PublicPrivacyPolicyUpdate']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicPrivacyPolicyUpdateQueryFindOneArgs, 'privacyPolicyUpdateId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicTermsUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicTermsUpdate'] = GQLResolversParentTypes['PublicTermsUpdate'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    termsUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicTermsUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicTermsUpdateQuery'] = GQLResolversParentTypes['PublicTermsUpdateQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['PublicTermsUpdate']>, ParentType, ContextType>;
    findLatest?: Resolver<Maybe<GQLResolversTypes['PublicTermsUpdate']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['PublicTermsUpdate']>,
        ParentType,
        ContextType,
        RequireFields<GQLPublicTermsUpdateQueryFindOneArgs, 'termsUpdateId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLPublicUserResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['PublicUser'] = GQLResolversParentTypes['PublicUser'],
> = {
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    language?: Resolver<GQLResolversTypes['UserLanguage'], ParentType, ContextType>;
    profilePictureUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = {
    admins?: Resolver<GQLResolversTypes['AdminQuery'], ParentType, ContextType>;
    allergies?: Resolver<GQLResolversTypes['AllergyQuery'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryQuery'], ParentType, ContextType>;
    cookSpecificFees?: Resolver<GQLResolversTypes['CookSpecificFeeQuery'], ParentType, ContextType>;
    cooks?: Resolver<GQLResolversTypes['CookQuery'], ParentType, ContextType>;
    customerFeeUpdates?: Resolver<GQLResolversTypes['CustomerFeeUpdateQuery'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenQuery'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageQuery'], ParentType, ContextType>;
    privacyPolicyUpdates?: Resolver<GQLResolversTypes['PrivacyPolicyUpdateQuery'], ParentType, ContextType>;
    publicCooks?: Resolver<GQLResolversTypes['PublicCookQuery'], ParentType, ContextType>;
    publicPrivacyPolicyUpdates?: Resolver<GQLResolversTypes['PublicPrivacyPolicyUpdateQuery'], ParentType, ContextType>;
    publicTermsUpdates?: Resolver<GQLResolversTypes['PublicTermsUpdateQuery'], ParentType, ContextType>;
    termsUpdates?: Resolver<GQLResolversTypes['TermsUpdateQuery'], ParentType, ContextType>;
    users?: Resolver<GQLResolversTypes['UserQuery'], ParentType, ContextType>;
};

export type GQLSessionResolvers<
    ContextType = any,
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
    ContextType = any,
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

export type GQLTermsUpdateResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['TermsUpdate'] = GQLResolversParentTypes['TermsUpdate'],
> = {
    admin?: Resolver<GQLResolversTypes['Admin'], ParentType, ContextType>;
    adminId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    englishText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    germanText?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    termsUpdateId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTermsUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['TermsUpdateMutation'] = GQLResolversParentTypes['TermsUpdateMutation'],
> = {
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLTermsUpdateMutationCreateOneArgs, 'request'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLTermsUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['TermsUpdateQuery'] = GQLResolversParentTypes['TermsUpdateQuery'],
> = {
    findAll?: Resolver<Array<GQLResolversTypes['TermsUpdate']>, ParentType, ContextType>;
    findLatest?: Resolver<Maybe<GQLResolversTypes['TermsUpdate']>, ParentType, ContextType>;
    findOne?: Resolver<
        Maybe<GQLResolversTypes['TermsUpdate']>,
        ParentType,
        ContextType,
        RequireFields<GQLTermsUpdateQueryFindOneArgs, 'termsUpdateId'>
    >;
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

export type GQLUserResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']> = {
    acceptedPrivacyPolicy?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    acceptedTerms?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    activeSessionCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    activeSessions?: Resolver<Array<GQLResolversTypes['Session']>, ParentType, ContextType>;
    admin?: Resolver<Maybe<GQLResolversTypes['Admin']>, ParentType, ContextType>;
    birthDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
    cook?: Resolver<Maybe<GQLResolversTypes['Cook']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    emailAddress?: Resolver<Maybe<GQLResolversTypes['EmailAddress']>, ParentType, ContextType>;
    emailAddressUpdate?: Resolver<Maybe<GQLResolversTypes['EmailAddressUpdate']>, ParentType, ContextType>;
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    gender?: Resolver<GQLResolversTypes['Gender'], ParentType, ContextType>;
    isAdmin?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isCook?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isLocked?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    language?: Resolver<GQLResolversTypes['UserLanguage'], ParentType, ContextType>;
    lastName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    notificationConfiguration?: Resolver<GQLResolversTypes['NotificationConfiguration'], ParentType, ContextType>;
    notifications?: Resolver<Array<GQLResolversTypes['Notification']>, ParentType, ContextType>;
    oneTimeAccessToken?: Resolver<Maybe<GQLResolversTypes['OneTimeAccessToken']>, ParentType, ContextType>;
    phoneNumber?: Resolver<Maybe<GQLResolversTypes['PhoneNumber']>, ParentType, ContextType>;
    phoneNumberUpdate?: Resolver<Maybe<GQLResolversTypes['PhoneNumberUpdate']>, ParentType, ContextType>;
    profilePictureUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    unreadNotificationCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserEmailAddressUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserEmailAddressUpdateMutation'] = GQLResolversParentTypes['UserEmailAddressUpdateMutation'],
> = {
    confirm?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserEmailAddressUpdateMutationConfirmArgs, 'secret'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserEmailAddressUpdateMutationCreateOneArgs, 'emailAddress'>
    >;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserEmailAddressUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserEmailAddressUpdateQuery'] = GQLResolversParentTypes['UserEmailAddressUpdateQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['EmailAddressUpdate']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserMutation'] = GQLResolversParentTypes['UserMutation'],
> = {
    acceptLatestPrivacyPolicy?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    acceptLatestTerms?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
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
    emailAddressUpdate?: Resolver<
        GQLResolversTypes['UserEmailAddressUpdateMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationEmailAddressUpdateArgs, 'userId'>
    >;
    notificationConfiguration?: Resolver<
        GQLResolversTypes['NotificationConfigurationMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationNotificationConfigurationArgs, 'userId'>
    >;
    notifications?: Resolver<
        GQLResolversTypes['UserNotificationMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationNotificationsArgs, 'userId'>
    >;
    oneTimeAccessToken?: Resolver<
        GQLResolversTypes['UserOneTimeAccessTokenMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationOneTimeAccessTokenArgs, 'userId'>
    >;
    phoneNumberUpdate?: Resolver<
        GQLResolversTypes['UserPhoneNumberUpdateMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationPhoneNumberUpdateArgs, 'userId'>
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
    updateIsLocked?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdateIsLockedArgs, 'isLocked' | 'userId'>
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

export type GQLUserNotificationMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserNotificationMutation'] = GQLResolversParentTypes['UserNotificationMutation'],
> = {
    deleteAll?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    deleteOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserNotificationMutationDeleteOneArgs, 'notificationId'>
    >;
    updateAllWasRead?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserNotificationMutationUpdateAllWasReadArgs, 'wasRead'>
    >;
    updateOneWasRead?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserNotificationMutationUpdateOneWasReadArgs, 'notificationId' | 'wasRead'>
    >;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserOneTimeAccessTokenMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserOneTimeAccessTokenMutation'] = GQLResolversParentTypes['UserOneTimeAccessTokenMutation'],
> = {
    confirm?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserOneTimeAccessTokenMutationConfirmArgs, 'secret'>
    >;
    createOneForEmailAddress?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserOneTimeAccessTokenMutationCreateOneForEmailAddressArgs, 'emailAddress'>
    >;
    createOneForPhoneNumber?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserOneTimeAccessTokenMutationCreateOneForPhoneNumberArgs, 'phoneNumber'>
    >;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserOneTimeAccessTokenQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserOneTimeAccessTokenQuery'] = GQLResolversParentTypes['UserOneTimeAccessTokenQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['OneTimeAccessToken']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserPhoneNumberUpdateMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserPhoneNumberUpdateMutation'] = GQLResolversParentTypes['UserPhoneNumberUpdateMutation'],
> = {
    confirm?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserPhoneNumberUpdateMutationConfirmArgs, 'secret'>
    >;
    createOne?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserPhoneNumberUpdateMutationCreateOneArgs, 'phoneNumber'>
    >;
    deleteOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserPhoneNumberUpdateQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserPhoneNumberUpdateQuery'] = GQLResolversParentTypes['UserPhoneNumberUpdateQuery'],
> = {
    findOne?: Resolver<Maybe<GQLResolversTypes['PhoneNumberUpdate']>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserQuery'] = GQLResolversParentTypes['UserQuery'],
> = {
    emailAddressUpdate?: Resolver<
        GQLResolversTypes['UserEmailAddressUpdateQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryEmailAddressUpdateArgs, 'userId'>
    >;
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['User']>>,
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, RequireFields<GQLUserQueryFindOneArgs, 'userId'>>;
    me?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType>;
    notificationConfiguration?: Resolver<
        Maybe<GQLResolversTypes['NotificationConfigurationQuery']>,
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryNotificationConfigurationArgs, 'userId'>
    >;
    notifications?: Resolver<
        GQLResolversTypes['NotificationQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryNotificationsArgs, 'userId'>
    >;
    oneTimeAccessToken?: Resolver<
        GQLResolversTypes['UserOneTimeAccessTokenQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryOneTimeAccessTokenArgs, 'userId'>
    >;
    phoneNumberUpdate?: Resolver<
        GQLResolversTypes['UserPhoneNumberUpdateQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryPhoneNumberUpdateArgs, 'userId'>
    >;
    sessions?: Resolver<GQLResolversTypes['UserSessionQuery'], ParentType, ContextType, RequireFields<GQLUserQuerySessionsArgs, 'userId'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserSessionMutationResolvers<
    ContextType = any,
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
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserSessionQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserSessionQuery'] = GQLResolversParentTypes['UserSessionQuery'],
> = {
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['Session']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResolvers<ContextType = any> = {
    Admin?: GQLAdminResolvers<ContextType>;
    AdminMutation?: GQLAdminMutationResolvers<ContextType>;
    AdminQuery?: GQLAdminQueryResolvers<ContextType>;
    Allergy?: GQLAllergyResolvers<ContextType>;
    AllergyMutation?: GQLAllergyMutationResolvers<ContextType>;
    AllergyQuery?: GQLAllergyQueryResolvers<ContextType>;
    AnonymousSession?: GQLAnonymousSessionResolvers<ContextType>;
    AnonymousUser?: GQLAnonymousUserResolvers<ContextType>;
    Category?: GQLCategoryResolvers<ContextType>;
    CategoryMutation?: GQLCategoryMutationResolvers<ContextType>;
    CategoryQuery?: GQLCategoryQueryResolvers<ContextType>;
    Cook?: GQLCookResolvers<ContextType>;
    CookMealMutation?: GQLCookMealMutationResolvers<ContextType>;
    CookMealQuery?: GQLCookMealQueryResolvers<ContextType>;
    CookMenuCourseMealOptionMutation?: GQLCookMenuCourseMealOptionMutationResolvers<ContextType>;
    CookMenuCourseMealOptionQuery?: GQLCookMenuCourseMealOptionQueryResolvers<ContextType>;
    CookMenuCourseMutation?: GQLCookMenuCourseMutationResolvers<ContextType>;
    CookMenuCourseQuery?: GQLCookMenuCourseQueryResolvers<ContextType>;
    CookMenuMutation?: GQLCookMenuMutationResolvers<ContextType>;
    CookMenuQuery?: GQLCookMenuQueryResolvers<ContextType>;
    CookMutation?: GQLCookMutationResolvers<ContextType>;
    CookQuery?: GQLCookQueryResolvers<ContextType>;
    CookSpecificFee?: GQLCookSpecificFeeResolvers<ContextType>;
    CookSpecificFeeMutation?: GQLCookSpecificFeeMutationResolvers<ContextType>;
    CookSpecificFeeQuery?: GQLCookSpecificFeeQueryResolvers<ContextType>;
    Course?: GQLCourseResolvers<ContextType>;
    CustomerFeeUpdate?: GQLCustomerFeeUpdateResolvers<ContextType>;
    CustomerFeeUpdateMutation?: GQLCustomerFeeUpdateMutationResolvers<ContextType>;
    CustomerFeeUpdateQuery?: GQLCustomerFeeUpdateQueryResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    EmailAddress?: GraphQLScalarType;
    EmailAddressUpdate?: GQLEmailAddressUpdateResolvers<ContextType>;
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
    MealOption?: GQLMealOptionResolvers<ContextType>;
    Menu?: GQLMenuResolvers<ContextType>;
    Mutation?: GQLMutationResolvers<ContextType>;
    Notification?: GQLNotificationResolvers<ContextType>;
    NotificationConfiguration?: GQLNotificationConfigurationResolvers<ContextType>;
    NotificationConfigurationMutation?: GQLNotificationConfigurationMutationResolvers<ContextType>;
    NotificationConfigurationQuery?: GQLNotificationConfigurationQueryResolvers<ContextType>;
    NotificationMutation?: GQLNotificationMutationResolvers<ContextType>;
    NotificationQuery?: GQLNotificationQueryResolvers<ContextType>;
    OneTimeAccessToken?: GQLOneTimeAccessTokenResolvers<ContextType>;
    PhoneNumber?: GraphQLScalarType;
    PhoneNumberUpdate?: GQLPhoneNumberUpdateResolvers<ContextType>;
    Price?: GQLPriceResolvers<ContextType>;
    PrivacyPolicyUpdate?: GQLPrivacyPolicyUpdateResolvers<ContextType>;
    PrivacyPolicyUpdateMutation?: GQLPrivacyPolicyUpdateMutationResolvers<ContextType>;
    PrivacyPolicyUpdateQuery?: GQLPrivacyPolicyUpdateQueryResolvers<ContextType>;
    PublicCook?: GQLPublicCookResolvers<ContextType>;
    PublicCookQuery?: GQLPublicCookQueryResolvers<ContextType>;
    PublicPrivacyPolicyUpdate?: GQLPublicPrivacyPolicyUpdateResolvers<ContextType>;
    PublicPrivacyPolicyUpdateQuery?: GQLPublicPrivacyPolicyUpdateQueryResolvers<ContextType>;
    PublicTermsUpdate?: GQLPublicTermsUpdateResolvers<ContextType>;
    PublicTermsUpdateQuery?: GQLPublicTermsUpdateQueryResolvers<ContextType>;
    PublicUser?: GQLPublicUserResolvers<ContextType>;
    Query?: GQLQueryResolvers<ContextType>;
    Session?: GQLSessionResolvers<ContextType>;
    SessionMutation?: GQLSessionMutationResolvers<ContextType>;
    TermsUpdate?: GQLTermsUpdateResolvers<ContextType>;
    TermsUpdateMutation?: GQLTermsUpdateMutationResolvers<ContextType>;
    TermsUpdateQuery?: GQLTermsUpdateQueryResolvers<ContextType>;
    UInt?: GraphQLScalarType;
    UUID?: GraphQLScalarType;
    Upload?: GraphQLScalarType;
    Url?: GraphQLScalarType;
    User?: GQLUserResolvers<ContextType>;
    UserEmailAddressUpdateMutation?: GQLUserEmailAddressUpdateMutationResolvers<ContextType>;
    UserEmailAddressUpdateQuery?: GQLUserEmailAddressUpdateQueryResolvers<ContextType>;
    UserMutation?: GQLUserMutationResolvers<ContextType>;
    UserNotificationMutation?: GQLUserNotificationMutationResolvers<ContextType>;
    UserOneTimeAccessTokenMutation?: GQLUserOneTimeAccessTokenMutationResolvers<ContextType>;
    UserOneTimeAccessTokenQuery?: GQLUserOneTimeAccessTokenQueryResolvers<ContextType>;
    UserPhoneNumberUpdateMutation?: GQLUserPhoneNumberUpdateMutationResolvers<ContextType>;
    UserPhoneNumberUpdateQuery?: GQLUserPhoneNumberUpdateQueryResolvers<ContextType>;
    UserQuery?: GQLUserQueryResolvers<ContextType>;
    UserSessionMutation?: GQLUserSessionMutationResolvers<ContextType>;
    UserSessionQuery?: GQLUserSessionQueryResolvers<ContextType>;
};
