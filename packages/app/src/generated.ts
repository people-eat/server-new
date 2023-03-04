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

export type GQLCook = {
    __typename?: 'Cook';
    biography: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    isLocked: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
    location: GQLLocation;
    maximumParticipants?: Maybe<Scalars['UInt']>;
    maximumPrice?: Maybe<Scalars['UInt']>;
    maximumTravelDistance?: Maybe<Scalars['UInt']>;
    minimumParticipants?: Maybe<Scalars['UInt']>;
    minimumPrice?: Maybe<Scalars['UInt']>;
    rank: GQLCookRank;
    travelExpenses: Scalars['UInt'];
};

export type GQLCookMutation = {
    __typename?: 'CookMutation';
    createOne: Scalars['Boolean'];
};

export type GQLCookMutationCreateOneArgs = {
    cook: GQLCreateOneCookRequest;
};

export type GQLCookQuery = {
    __typename?: 'CookQuery';
    findMany?: Maybe<Array<GQLCook>>;
    findOne?: Maybe<GQLCook>;
};

export type GQLCookQueryFindManyArgs = {
    request: GQLFindManyCooksRequest;
};

export type GQLCookQueryFindOneArgs = {
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
    findMany?: Maybe<Array<GQLEmailAddressUpdate>>;
    userId: Scalars['String'];
};

export type GQLExpireOneSessionRequest = {
    sessionId: Scalars['String'];
    userId: Scalars['String'];
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
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    currencyCode: GQLCurrencyCode;
    description: Scalars['String'];
    greetingFromKitchen: Scalars['Boolean'];
    isVisible: Scalars['Boolean'];
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
    addresses: GQLAddressMutation;
    cooks: GQLCookMutation;
    emailAddressUpdates: GQLEmailAddressUpdateMutation;
    meals: GQLMealMutation;
    menus: GQLMenuMutation;
    notificationConfigurations: GQLNotificationConfigurationMutation;
    notifications: GQLNotificationMutation;
    oneTimeAccessTokens: GQLOneTimeAccessTokenMutation;
    phoneNumberUpdates: GQLPhoneNumberUpdateMutation;
    sessions: GQLSessionMutation;
    users: GQLUserMutation;
};

export type GQLMutationAddressesArgs = {
    userId: Scalars['String'];
};

export type GQLMutationEmailAddressUpdatesArgs = {
    userId: Scalars['String'];
};

export type GQLMutationMealsArgs = {
    cookId: Scalars['String'];
};

export type GQLMutationMenusArgs = {
    cookId: Scalars['String'];
};

export type GQLMutationNotificationConfigurationsArgs = {
    userId: Scalars['String'];
};

export type GQLMutationNotificationsArgs = {
    userId: Scalars['String'];
};

export type GQLMutationOneTimeAccessTokensArgs = {
    userId: Scalars['String'];
};

export type GQLMutationPhoneNumberUpdatesArgs = {
    userId: Scalars['String'];
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
    findMany?: Maybe<Array<GQLPhoneNumberUpdate>>;
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

export type GQLPublicCook = {
    __typename?: 'PublicCook';
    biography: Scalars['String'];
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
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
    cook?: Maybe<GQLPublicCook>;
    cookId: Scalars['String'];
    createdAt: Scalars['DateTime'];
    description: Scalars['String'];
    greetingFromKitchen: Scalars['Boolean'];
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

export type GQLPublicUser = {
    __typename?: 'PublicUser';
    firstName: Scalars['String'];
    profilePictureUrl?: Maybe<Scalars['Url']>;
    userId: Scalars['String'];
};

export type GQLQuery = {
    __typename?: 'Query';
    addresses: GQLAddressQuery;
    cooks: GQLCookQuery;
    emailAddressUpdates: GQLEmailAddressUpdateQuery;
    meals: GQLMealQuery;
    menus: GQLMenuQuery;
    notificationConfigurations: GQLNotificationConfigurationQuery;
    notifications: GQLNotificationQuery;
    oneTimeAccessTokens: GQLOneTimeAccessTokenQuery;
    phoneNumberUpdates: GQLPhoneNumberUpdateQuery;
    publicCooks: GQLPublicCookQuery;
    publicMenus: GQLPublicMenuQuery;
    sessions: GQLSessionQuery;
    users: GQLUserQuery;
};

export type GQLQueryAddressesArgs = {
    userId: Scalars['String'];
};

export type GQLQueryEmailAddressUpdatesArgs = {
    userId: Scalars['String'];
};

export type GQLQueryMealsArgs = {
    cookId: Scalars['String'];
};

export type GQLQueryMenusArgs = {
    cookId: Scalars['String'];
};

export type GQLQueryNotificationConfigurationsArgs = {
    userId: Scalars['String'];
};

export type GQLQueryNotificationsArgs = {
    userId: Scalars['String'];
};

export type GQLQueryOneTimeAccessTokensArgs = {
    userId: Scalars['String'];
};

export type GQLQueryPhoneNumberUpdatesArgs = {
    userId: Scalars['String'];
};

export type GQLSession = {
    __typename?: 'Session';
    sessionId: Scalars['String'];
};

export type GQLSessionMutation = {
    __typename?: 'SessionMutation';
    assignOneByEmailAddress: Scalars['Boolean'];
    assignOneByIdentityProvider: Scalars['Boolean'];
    assignOneByPhoneNumber: Scalars['Boolean'];
    expireOne: Scalars['Boolean'];
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

export type GQLSessionMutationExpireOneArgs = {
    request: GQLExpireOneSessionRequest;
};

export type GQLSessionQuery = {
    __typename?: 'SessionQuery';
    findMany?: Maybe<Array<GQLSession>>;
};

export type GQLSessionQueryFindManyArgs = {
    userId: Scalars['String'];
};

export type GQLUser = {
    __typename?: 'User';
    acceptedPrivacyPolicy: Scalars['DateTime'];
    acceptedTerms: Scalars['DateTime'];
    birthDate?: Maybe<Scalars['Date']>;
    createdAt: Scalars['DateTime'];
    emailAddress?: Maybe<Scalars['EmailAddress']>;
    firstName: Scalars['String'];
    gender: Gender;
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
    createOneByEmailAddress: Scalars['Boolean'];
    createOneByIdentityProvider: Scalars['Boolean'];
    createOneByPhoneNumber: Scalars['Boolean'];
    updateGender: Scalars['Boolean'];
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

export type GQLUserMutationUpdateGenderArgs = {
    gender: Gender;
};

export type GQLUserQuery = {
    __typename?: 'UserQuery';
    findMany?: Maybe<Array<GQLUser>>;
    findOne?: Maybe<GQLUser>;
    me?: Maybe<GQLUser>;
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
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Cook: ResolverTypeWrapper<GQLCook>;
    CookMutation: ResolverTypeWrapper<GQLCookMutation>;
    CookQuery: ResolverTypeWrapper<GQLCookQuery>;
    CookRank: GQLCookRank;
    CreateOneAddressRequest: GQLCreateOneAddressRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
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
    FindManyCooksRequest: GQLFindManyCooksRequest;
    FindManyMealsRequest: GQLFindManyMealsRequest;
    FindManyMenusRequest: GQLFindManyMenusRequest;
    FindManyPublicCooksRequest: GQLFindManyPublicCooksRequest;
    FindManyPublicMenusRequest: GQLFindManyPublicMenusRequest;
    FindManyRequest: GQLFindManyRequest;
    FindManyUsersRequest: GQLFindManyUsersRequest;
    Gender: Gender;
    IdentityProvider: GQLIdentityProvider;
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
    PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
    PhoneNumberUpdate: ResolverTypeWrapper<GQLPhoneNumberUpdate>;
    PhoneNumberUpdateMutation: ResolverTypeWrapper<GQLPhoneNumberUpdateMutation>;
    PhoneNumberUpdateQuery: ResolverTypeWrapper<GQLPhoneNumberUpdateQuery>;
    Platform: GQLPlatform;
    Price: ResolverTypeWrapper<GQLPrice>;
    PriceInput: GQLPriceInput;
    PublicCook: ResolverTypeWrapper<GQLPublicCook>;
    PublicCookQuery: ResolverTypeWrapper<GQLPublicCookQuery>;
    PublicMenu: ResolverTypeWrapper<GQLPublicMenu>;
    PublicMenuQuery: ResolverTypeWrapper<GQLPublicMenuQuery>;
    PublicUser: ResolverTypeWrapper<GQLPublicUser>;
    Query: ResolverTypeWrapper<{}>;
    Session: ResolverTypeWrapper<GQLSession>;
    SessionMutation: ResolverTypeWrapper<GQLSessionMutation>;
    SessionQuery: ResolverTypeWrapper<GQLSessionQuery>;
    String: ResolverTypeWrapper<Scalars['String']>;
    UInt: ResolverTypeWrapper<Scalars['UInt']>;
    UUID: ResolverTypeWrapper<Scalars['UUID']>;
    Url: ResolverTypeWrapper<Scalars['Url']>;
    User: ResolverTypeWrapper<GQLUser>;
    UserLanguage: GQLUserLanguage;
    UserMutation: ResolverTypeWrapper<GQLUserMutation>;
    UserQuery: ResolverTypeWrapper<GQLUserQuery>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
    Address: GQLAddress;
    AddressMutation: GQLAddressMutation;
    AddressQuery: GQLAddressQuery;
    Boolean: Scalars['Boolean'];
    Cook: GQLCook;
    CookMutation: GQLCookMutation;
    CookQuery: GQLCookQuery;
    CreateOneAddressRequest: GQLCreateOneAddressRequest;
    CreateOneCookRequest: GQLCreateOneCookRequest;
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
    FindManyCooksRequest: GQLFindManyCooksRequest;
    FindManyMealsRequest: GQLFindManyMealsRequest;
    FindManyMenusRequest: GQLFindManyMenusRequest;
    FindManyPublicCooksRequest: GQLFindManyPublicCooksRequest;
    FindManyPublicMenusRequest: GQLFindManyPublicMenusRequest;
    FindManyRequest: GQLFindManyRequest;
    FindManyUsersRequest: GQLFindManyUsersRequest;
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
    PhoneNumber: Scalars['PhoneNumber'];
    PhoneNumberUpdate: GQLPhoneNumberUpdate;
    PhoneNumberUpdateMutation: GQLPhoneNumberUpdateMutation;
    PhoneNumberUpdateQuery: GQLPhoneNumberUpdateQuery;
    Price: GQLPrice;
    PriceInput: GQLPriceInput;
    PublicCook: GQLPublicCook;
    PublicCookQuery: GQLPublicCookQuery;
    PublicMenu: GQLPublicMenu;
    PublicMenuQuery: GQLPublicMenuQuery;
    PublicUser: GQLPublicUser;
    Query: {};
    Session: GQLSession;
    SessionMutation: GQLSessionMutation;
    SessionQuery: GQLSessionQuery;
    String: Scalars['String'];
    UInt: Scalars['UInt'];
    UUID: Scalars['UUID'];
    Url: Scalars['Url'];
    User: GQLUser;
    UserMutation: GQLUserMutation;
    UserQuery: GQLUserQuery;
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

export type GQLCookResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Cook'] = GQLResolversParentTypes['Cook'],
> = {
    biography?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    isLocked?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isVisible?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    location?: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>;
    maximumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    maximumTravelDistance?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumParticipants?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    minimumPrice?: Resolver<Maybe<GQLResolversTypes['UInt']>, ParentType, ContextType>;
    rank?: Resolver<GQLResolversTypes['CookRank'], ParentType, ContextType>;
    travelExpenses?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLCookMutationResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['CookMutation'] = GQLResolversParentTypes['CookMutation'],
> = {
    createOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLCookMutationCreateOneArgs, 'cook'>>;
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
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['EmailAddressUpdate']>>, ParentType, ContextType>;
    userId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLGenderResolvers = EnumResolverSignature<
    { DIVERSE?: any; FEMALE?: any; MALE?: any; NO_INFORMATION?: any },
    GQLResolversTypes['Gender']
>;

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
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    greetingFromKitchen?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    isVisible?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
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
    addresses?: Resolver<GQLResolversTypes['AddressMutation'], ParentType, ContextType, RequireFields<GQLMutationAddressesArgs, 'userId'>>;
    cooks?: Resolver<GQLResolversTypes['CookMutation'], ParentType, ContextType>;
    emailAddressUpdates?: Resolver<
        GQLResolversTypes['EmailAddressUpdateMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLMutationEmailAddressUpdatesArgs, 'userId'>
    >;
    meals?: Resolver<GQLResolversTypes['MealMutation'], ParentType, ContextType, RequireFields<GQLMutationMealsArgs, 'cookId'>>;
    menus?: Resolver<GQLResolversTypes['MenuMutation'], ParentType, ContextType, RequireFields<GQLMutationMenusArgs, 'cookId'>>;
    notificationConfigurations?: Resolver<
        GQLResolversTypes['NotificationConfigurationMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLMutationNotificationConfigurationsArgs, 'userId'>
    >;
    notifications?: Resolver<
        GQLResolversTypes['NotificationMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLMutationNotificationsArgs, 'userId'>
    >;
    oneTimeAccessTokens?: Resolver<
        GQLResolversTypes['OneTimeAccessTokenMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLMutationOneTimeAccessTokensArgs, 'userId'>
    >;
    phoneNumberUpdates?: Resolver<
        GQLResolversTypes['PhoneNumberUpdateMutation'],
        ParentType,
        ContextType,
        RequireFields<GQLMutationPhoneNumberUpdatesArgs, 'userId'>
    >;
    sessions?: Resolver<GQLResolversTypes['SessionMutation'], ParentType, ContextType>;
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
    findMany?: Resolver<Maybe<Array<GQLResolversTypes['PhoneNumberUpdate']>>, ParentType, ContextType>;
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

export type GQLPublicCookResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['PublicCook'] = GQLResolversParentTypes['PublicCook'],
> = {
    biography?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
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
    cook?: Resolver<Maybe<GQLResolversTypes['PublicCook']>, ParentType, ContextType>;
    cookId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    greetingFromKitchen?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
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
    addresses?: Resolver<GQLResolversTypes['AddressQuery'], ParentType, ContextType, RequireFields<GQLQueryAddressesArgs, 'userId'>>;
    cooks?: Resolver<GQLResolversTypes['CookQuery'], ParentType, ContextType>;
    emailAddressUpdates?: Resolver<
        GQLResolversTypes['EmailAddressUpdateQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLQueryEmailAddressUpdatesArgs, 'userId'>
    >;
    meals?: Resolver<GQLResolversTypes['MealQuery'], ParentType, ContextType, RequireFields<GQLQueryMealsArgs, 'cookId'>>;
    menus?: Resolver<GQLResolversTypes['MenuQuery'], ParentType, ContextType, RequireFields<GQLQueryMenusArgs, 'cookId'>>;
    notificationConfigurations?: Resolver<
        GQLResolversTypes['NotificationConfigurationQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLQueryNotificationConfigurationsArgs, 'userId'>
    >;
    notifications?: Resolver<
        GQLResolversTypes['NotificationQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLQueryNotificationsArgs, 'userId'>
    >;
    oneTimeAccessTokens?: Resolver<
        GQLResolversTypes['OneTimeAccessTokenQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLQueryOneTimeAccessTokensArgs, 'userId'>
    >;
    phoneNumberUpdates?: Resolver<
        GQLResolversTypes['PhoneNumberUpdateQuery'],
        ParentType,
        ContextType,
        RequireFields<GQLQueryPhoneNumberUpdatesArgs, 'userId'>
    >;
    publicCooks?: Resolver<GQLResolversTypes['PublicCookQuery'], ParentType, ContextType>;
    publicMenus?: Resolver<GQLResolversTypes['PublicMenuQuery'], ParentType, ContextType>;
    sessions?: Resolver<GQLResolversTypes['SessionQuery'], ParentType, ContextType>;
    users?: Resolver<GQLResolversTypes['UserQuery'], ParentType, ContextType>;
};

export type GQLSessionResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['Session'] = GQLResolversParentTypes['Session'],
> = {
    sessionId?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
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
    expireOne?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GQLSessionMutationExpireOneArgs, 'request'>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLSessionQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['SessionQuery'] = GQLResolversParentTypes['SessionQuery'],
> = {
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['Session']>>,
        ParentType,
        ContextType,
        RequireFields<GQLSessionQueryFindManyArgs, 'userId'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GQLUIntScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UInt'], any> {
    name: 'UInt';
}

export interface GQLUuidScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UUID'], any> {
    name: 'UUID';
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
    birthDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    emailAddress?: Resolver<Maybe<GQLResolversTypes['EmailAddress']>, ParentType, ContextType>;
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    gender?: Resolver<GQLResolversTypes['Gender'], ParentType, ContextType>;
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
    updateGender?: Resolver<
        GQLResolversTypes['Boolean'],
        ParentType,
        ContextType,
        RequireFields<GQLUserMutationUpdateGenderArgs, 'gender'>
    >;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLUserQueryResolvers<
    ContextType = Context,
    ParentType extends GQLResolversParentTypes['UserQuery'] = GQLResolversParentTypes['UserQuery'],
> = {
    findMany?: Resolver<
        Maybe<Array<GQLResolversTypes['User']>>,
        ParentType,
        ContextType,
        RequireFields<GQLUserQueryFindManyArgs, 'request'>
    >;
    findOne?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, RequireFields<GQLUserQueryFindOneArgs, 'userId'>>;
    me?: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, Partial<GQLUserQueryMeArgs>>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GQLResolvers<ContextType = Context> = {
    Address?: GQLAddressResolvers<ContextType>;
    AddressMutation?: GQLAddressMutationResolvers<ContextType>;
    AddressQuery?: GQLAddressQueryResolvers<ContextType>;
    Cook?: GQLCookResolvers<ContextType>;
    CookMutation?: GQLCookMutationResolvers<ContextType>;
    CookQuery?: GQLCookQueryResolvers<ContextType>;
    Date?: GraphQLScalarType;
    DateTime?: GraphQLScalarType;
    EmailAddress?: GraphQLScalarType;
    EmailAddressUpdate?: GQLEmailAddressUpdateResolvers<ContextType>;
    EmailAddressUpdateMutation?: GQLEmailAddressUpdateMutationResolvers<ContextType>;
    EmailAddressUpdateQuery?: GQLEmailAddressUpdateQueryResolvers<ContextType>;
    Gender?: GQLGenderResolvers;
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
    PhoneNumber?: GraphQLScalarType;
    PhoneNumberUpdate?: GQLPhoneNumberUpdateResolvers<ContextType>;
    PhoneNumberUpdateMutation?: GQLPhoneNumberUpdateMutationResolvers<ContextType>;
    PhoneNumberUpdateQuery?: GQLPhoneNumberUpdateQueryResolvers<ContextType>;
    Price?: GQLPriceResolvers<ContextType>;
    PublicCook?: GQLPublicCookResolvers<ContextType>;
    PublicCookQuery?: GQLPublicCookQueryResolvers<ContextType>;
    PublicMenu?: GQLPublicMenuResolvers<ContextType>;
    PublicMenuQuery?: GQLPublicMenuQueryResolvers<ContextType>;
    PublicUser?: GQLPublicUserResolvers<ContextType>;
    Query?: GQLQueryResolvers<ContextType>;
    Session?: GQLSessionResolvers<ContextType>;
    SessionMutation?: GQLSessionMutationResolvers<ContextType>;
    SessionQuery?: GQLSessionQueryResolvers<ContextType>;
    UInt?: GraphQLScalarType;
    UUID?: GraphQLScalarType;
    Url?: GraphQLScalarType;
    User?: GQLUserResolvers<ContextType>;
    UserMutation?: GQLUserMutationResolvers<ContextType>;
    UserQuery?: GQLUserQueryResolvers<ContextType>;
};
