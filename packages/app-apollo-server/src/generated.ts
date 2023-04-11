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
    minimumParticipants?: Maybe<Scalars['UInt']>;
    minimumPrice?: Maybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
    user: GQLUser;
};

export type GQLCookMutation = {
    __typename?: 'CookMutation';
    addOneLanguage: Scalars['Boolean'];
    createOne: Scalars['Boolean'];
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
};

export type GQLCookQueryFindManyArgs = {
    request: GQLFindManyRequest;
};

export type GQLCookQueryFindOneArgs = {
    cookId: Scalars['String'];
};

export type GQLCookRank = 'HOBBY' | 'PROFESSIONAL';

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

export type GQLCreateOneNotificationRequest = {
    message: Scalars['String'];
    url?: InputMaybe<Scalars['Url']>;
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

export type GQLMealType = 'DESSERT' | 'FISH' | 'MEAT' | 'SOUP' | 'SPECIAL' | 'VEGAN' | 'VEGETARIAN';

export type GQLMutation = {
    __typename?: 'Mutation';
    admins: GQLAdminMutation;
    allergies: GQLAllergyMutation;
    categories: GQLCategoryMutation;
    cooks: GQLCookMutation;
    kitchens: GQLKitchenMutation;
    languages: GQLLanguageMutation;
    notifications: GQLNotificationMutation;
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

export type GQLPaymentProvider = 'STRIPE';

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
    cooks: GQLCookQuery;
    kitchens: GQLKitchenQuery;
    languages: GQLLanguageQuery;
    publicCooks: GQLPublicCookQuery;
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
    firstName: Scalars['String'];
    gender: GQLGender;
    isAdmin: Scalars['Boolean'];
    isCook: Scalars['Boolean'];
    isLocked: Scalars['Boolean'];
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    notificationConfiguration: GQLNotificationConfiguration;
    notifications: Array<GQLNotification>;
    phoneNumber?: Maybe<Scalars['PhoneNumber']>;
    profilePictureUrl?: Maybe<Scalars['Url']>;
    unreadNotificationCount: Scalars['UInt'];
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
    notificationConfiguration: GQLNotificationConfigurationMutation;
    notifications: GQLUserNotificationMutation;
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

export type GQLUserMutationNotificationConfigurationArgs = {
    userId: Scalars['String'];
};

export type GQLUserMutationNotificationsArgs = {
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

export type GQLUserQuery = {
    __typename?: 'UserQuery';
    findMany?: Maybe<Array<GQLUser>>;
    findOne?: Maybe<GQLUser>;
    me?: Maybe<GQLUser>;
    notificationConfiguration?: Maybe<GQLNotificationConfigurationQuery>;
    notifications: GQLNotificationQuery;
    sessions: GQLUserSessionQuery;
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
    CookMutation: ResolverTypeWrapper<GQLCookMutation>;
    CookQuery: ResolverTypeWrapper<GQLCookQuery>;
    CookRank: GQLCookRank;
    CreateOneAdminRequest: GQLCreateOneAdminRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
    CreateOneNotificationRequest: GQLCreateOneNotificationRequest;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneTermsUpdateRequest: GQLCreateOneTermsUpdateRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    CurrencyCode: GQLCurrencyCode;
    Date: ResolverTypeWrapper<Scalars['Date']>;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>;
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
    MealType: GQLMealType;
    Mutation: ResolverTypeWrapper<{}>;
    Notification: ResolverTypeWrapper<GQLNotification>;
    NotificationConfiguration: ResolverTypeWrapper<GQLNotificationConfiguration>;
    NotificationConfigurationMutation: ResolverTypeWrapper<GQLNotificationConfigurationMutation>;
    NotificationConfigurationQuery: ResolverTypeWrapper<GQLNotificationConfigurationQuery>;
    NotificationMutation: ResolverTypeWrapper<GQLNotificationMutation>;
    NotificationQuery: ResolverTypeWrapper<GQLNotificationQuery>;
    PaymentProvider: GQLPaymentProvider;
    PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
    Platform: GQLPlatform;
    Price: ResolverTypeWrapper<GQLPrice>;
    PriceInput: GQLPriceInput;
    PublicCook: ResolverTypeWrapper<GQLPublicCook>;
    PublicCookQuery: ResolverTypeWrapper<GQLPublicCookQuery>;
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
    UserLanguage: GQLUserLanguage;
    UserMutation: ResolverTypeWrapper<GQLUserMutation>;
    UserNotificationMutation: ResolverTypeWrapper<GQLUserNotificationMutation>;
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
    CookMutation: GQLCookMutation;
    CookQuery: GQLCookQuery;
    CreateOneAdminRequest: GQLCreateOneAdminRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
    CreateOneNotificationRequest: GQLCreateOneNotificationRequest;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneTermsUpdateRequest: GQLCreateOneTermsUpdateRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    Date: Scalars['Date'];
    DateTime: Scalars['DateTime'];
    EmailAddress: Scalars['EmailAddress'];
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
    Mutation: {};
    Notification: GQLNotification;
    NotificationConfiguration: GQLNotificationConfiguration;
    NotificationConfigurationMutation: GQLNotificationConfigurationMutation;
    NotificationConfigurationQuery: GQLNotificationConfigurationQuery;
    NotificationMutation: GQLNotificationMutation;
    NotificationQuery: GQLNotificationQuery;
    PhoneNumber: Scalars['PhoneNumber'];
    Price: GQLPrice;
    PriceInput: GQLPriceInput;
    PublicCook: GQLPublicCook;
    PublicCookQuery: GQLPublicCookQuery;
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
    UserMutation: GQLUserMutation;
    UserNotificationMutation: GQLUserNotificationMutation;
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
    minimumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    rank?: Resolver<GQLResolversTypes['CookRank'], ParentType, ContextType>;
    travelExpenses?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    user?: Resolver<GQLResolversTypes['User'], ParentType, ContextType>;
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

export type GQLMutationResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation'],
> = {
    admins?: Resolver<GQLResolversTypes['AdminMutation'], ParentType, ContextType>;
    allergies?: Resolver<GQLResolversTypes['AllergyMutation'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryMutation'], ParentType, ContextType>;
    cooks?: Resolver<GQLResolversTypes['CookMutation'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenMutation'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageMutation'], ParentType, ContextType>;
    notifications?: Resolver<GQLResolversTypes['NotificationMutation'], ParentType, ContextType>;
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

export interface GQLPhoneNumberScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['PhoneNumber'], any> {
    name: 'PhoneNumber';
}

export type GQLPriceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Price'] = GQLResolversParentTypes['Price']> = {
    amount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
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
    cooks?: Resolver<GQLResolversTypes['CookQuery'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenQuery'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageQuery'], ParentType, ContextType>;
    publicCooks?: Resolver<GQLResolversTypes['PublicCookQuery'], ParentType, ContextType>;
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
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    gender?: Resolver<GQLResolversTypes['Gender'], ParentType, ContextType>;
    isAdmin?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isCook?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isLocked?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    language?: Resolver<GQLResolversTypes['UserLanguage'], ParentType, ContextType>;
    lastName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    notificationConfiguration?: Resolver<GQLResolversTypes['NotificationConfiguration'], ParentType, ContextType>;
    notifications?: Resolver<Array<GQLResolversTypes['Notification']>, ParentType, ContextType>;
    phoneNumber?: Resolver<Maybe<GQLResolversTypes['PhoneNumber']>, ParentType, ContextType>;
    profilePictureUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
    unreadNotificationCount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
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

export type GQLUserQueryResolvers<
    ContextType = any,
    ParentType extends GQLResolversParentTypes['UserQuery'] = GQLResolversParentTypes['UserQuery'],
> = {
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
    CookMutation?: GQLCookMutationResolvers<ContextType>;
    CookQuery?: GQLCookQueryResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    EmailAddress?: GraphQLScalarType;
    Kitchen?: GQLKitchenResolvers<ContextType>;
    KitchenMutation?: GQLKitchenMutationResolvers<ContextType>;
    KitchenQuery?: GQLKitchenQueryResolvers<ContextType>;
    Language?: GQLLanguageResolvers<ContextType>;
    LanguageMutation?: GQLLanguageMutationResolvers<ContextType>;
    LanguageQuery?: GQLLanguageQueryResolvers<ContextType>;
    Latitude?: GraphQLScalarType;
    Location?: GQLLocationResolvers<ContextType>;
    Longitude?: GraphQLScalarType;
    Mutation?: GQLMutationResolvers<ContextType>;
    Notification?: GQLNotificationResolvers<ContextType>;
    NotificationConfiguration?: GQLNotificationConfigurationResolvers<ContextType>;
    NotificationConfigurationMutation?: GQLNotificationConfigurationMutationResolvers<ContextType>;
    NotificationConfigurationQuery?: GQLNotificationConfigurationQueryResolvers<ContextType>;
    NotificationMutation?: GQLNotificationMutationResolvers<ContextType>;
    NotificationQuery?: GQLNotificationQueryResolvers<ContextType>;
    PhoneNumber?: GraphQLScalarType;
    Price?: GQLPriceResolvers<ContextType>;
    PublicCook?: GQLPublicCookResolvers<ContextType>;
    PublicCookQuery?: GQLPublicCookQueryResolvers<ContextType>;
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
    UserMutation?: GQLUserMutationResolvers<ContextType>;
    UserNotificationMutation?: GQLUserNotificationMutationResolvers<ContextType>;
    UserQuery?: GQLUserQueryResolvers<ContextType>;
    UserSessionMutation?: GQLUserSessionMutationResolvers<ContextType>;
    UserSessionQuery?: GQLUserSessionQueryResolvers<ContextType>;
};
