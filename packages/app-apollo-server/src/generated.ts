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

export type GQLCookRank = 'HOBBY' | 'PROFESSIONAL';

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
    gender: GQLGender;
    language: GQLUserLanguage;
    lastName: Scalars['String'];
    password: Scalars['String'];
    profilePictureUrl?: InputMaybe<Scalars['Url']>;
};

export type GQLCreateOneUserByIdentityProviderRequest = {
    birthDate?: InputMaybe<Scalars['Date']>;
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
    allergies: GQLAllergyMutation;
    categories: GQLCategoryMutation;
    kitchens: GQLKitchenMutation;
    languages: GQLLanguageMutation;
    sessions: GQLSessionMutation;
    users: GQLUserMutation;
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
    allergies: GQLAllergyQuery;
    categories: GQLCategoryQuery;
    kitchens: GQLKitchenQuery;
    languages: GQLLanguageQuery;
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

export type GQLUser = {
    __typename?: 'User';
    acceptedPrivacyPolicy: Scalars['DateTime'];
    acceptedTerms: Scalars['DateTime'];
    activeSessionCount: Scalars['UInt'];
    activeSessions: Array<GQLSession>;
    birthDate?: Maybe<Scalars['Date']>;
    createdAt: Scalars['DateTime'];
    emailAddress?: Maybe<Scalars['EmailAddress']>;
    firstName: Scalars['String'];
    gender: GQLGender;
    isLocked: Scalars['Boolean'];
    language: GQLUserLanguage;
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

export type GQLUserQuery = {
    __typename?: 'UserQuery';
    findMany?: Maybe<Array<GQLUser>>;
    findOne?: Maybe<GQLUser>;
    me?: Maybe<GQLUser>;
    sessions: GQLUserSessionQuery;
};

export type GQLUserQueryFindManyArgs = {
    request: GQLFindManyRequest;
};

export type GQLUserQueryFindOneArgs = {
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
    Allergy: ResolverTypeWrapper<GQLAllergy>;
    AllergyMutation: ResolverTypeWrapper<GQLAllergyMutation>;
    AllergyQuery: ResolverTypeWrapper<GQLAllergyQuery>;
    AnonymousSession: ResolverTypeWrapper<GQLAnonymousSession>;
    AnonymousUser: ResolverTypeWrapper<GQLAnonymousUser>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Category: ResolverTypeWrapper<GQLCategory>;
    CategoryMutation: ResolverTypeWrapper<GQLCategoryMutation>;
    CategoryQuery: ResolverTypeWrapper<GQLCategoryQuery>;
    CookRank: GQLCookRank;
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
    ExpireOneSessionRequest: GQLExpireOneSessionRequest;
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
    PaymentProvider: GQLPaymentProvider;
    PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
    Platform: GQLPlatform;
    Price: ResolverTypeWrapper<GQLPrice>;
    PriceInput: GQLPriceInput;
    PublicUser: ResolverTypeWrapper<GQLPublicUser>;
    Query: ResolverTypeWrapper<{}>;
    Session: ResolverTypeWrapper<GQLSession>;
    SessionMutation: ResolverTypeWrapper<GQLSessionMutation>;
    String: ResolverTypeWrapper<Scalars['String']>;
    UInt: ResolverTypeWrapper<Scalars['UInt']>;
    UUID: ResolverTypeWrapper<Scalars['UUID']>;
    Upload: ResolverTypeWrapper<Scalars['Upload']>;
    Url: ResolverTypeWrapper<Scalars['Url']>;
    User: ResolverTypeWrapper<GQLUser>;
    UserLanguage: GQLUserLanguage;
    UserMutation: ResolverTypeWrapper<GQLUserMutation>;
    UserQuery: ResolverTypeWrapper<GQLUserQuery>;
    UserSessionMutation: ResolverTypeWrapper<GQLUserSessionMutation>;
    UserSessionQuery: ResolverTypeWrapper<GQLUserSessionQuery>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
    Allergy: GQLAllergy;
    AllergyMutation: GQLAllergyMutation;
    AllergyQuery: GQLAllergyQuery;
    AnonymousSession: GQLAnonymousSession;
    AnonymousUser: GQLAnonymousUser;
    Boolean: Scalars['Boolean'];
    Category: GQLCategory;
    CategoryMutation: GQLCategoryMutation;
    CategoryQuery: GQLCategoryQuery;
    CreateOneSessionByEmailAddressRequest: GQLCreateOneSessionByEmailAddressRequest;
    CreateOneSessionByIdentityProviderRequest: GQLCreateOneSessionByIdentityProviderRequest;
    CreateOneSessionByPhoneNumberRequest: GQLCreateOneSessionByPhoneNumberRequest;
    CreateOneUserByEmailAddressRequest: GQLCreateOneUserByEmailAddressRequest;
    CreateOneUserByIdentityProviderRequest: GQLCreateOneUserByIdentityProviderRequest;
    CreateOneUserByPhoneNumberRequest: GQLCreateOneUserByPhoneNumberRequest;
    Date: Scalars['Date'];
    DateTime: Scalars['DateTime'];
    EmailAddress: Scalars['EmailAddress'];
    ExpireOneSessionRequest: GQLExpireOneSessionRequest;
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
    PhoneNumber: Scalars['PhoneNumber'];
    Price: GQLPrice;
    PriceInput: GQLPriceInput;
    PublicUser: GQLPublicUser;
    Query: {};
    Session: GQLSession;
    SessionMutation: GQLSessionMutation;
    String: Scalars['String'];
    UInt: Scalars['UInt'];
    UUID: Scalars['UUID'];
    Upload: Scalars['Upload'];
    Url: Scalars['Url'];
    User: GQLUser;
    UserMutation: GQLUserMutation;
    UserQuery: GQLUserQuery;
    UserSessionMutation: GQLUserSessionMutation;
    UserSessionQuery: GQLUserSessionQuery;
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
    allergies?: Resolver<GQLResolversTypes['AllergyMutation'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryMutation'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenMutation'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageMutation'], ParentType, ContextType>;
    sessions?: Resolver<GQLResolversTypes['SessionMutation'], ParentType, ContextType>;
    users?: Resolver<GQLResolversTypes['UserMutation'], ParentType, ContextType>;
};

export interface GQLPhoneNumberScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['PhoneNumber'], any> {
    name: 'PhoneNumber';
}

export type GQLPriceResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Price'] = GQLResolversParentTypes['Price']> = {
    amount?: Resolver<GQLResolversTypes['UInt'], ParentType, ContextType>;
    currencyCode?: Resolver<GQLResolversTypes['CurrencyCode'], ParentType, ContextType>;
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
    allergies?: Resolver<GQLResolversTypes['AllergyQuery'], ParentType, ContextType>;
    categories?: Resolver<GQLResolversTypes['CategoryQuery'], ParentType, ContextType>;
    kitchens?: Resolver<GQLResolversTypes['KitchenQuery'], ParentType, ContextType>;
    languages?: Resolver<GQLResolversTypes['LanguageQuery'], ParentType, ContextType>;
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
    birthDate?: Resolver<Maybe<GQLResolversTypes['Date']>, ParentType, ContextType>;
    createdAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
    emailAddress?: Resolver<Maybe<GQLResolversTypes['EmailAddress']>, ParentType, ContextType>;
    firstName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    gender?: Resolver<GQLResolversTypes['Gender'], ParentType, ContextType>;
    isLocked?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
    language?: Resolver<GQLResolversTypes['UserLanguage'], ParentType, ContextType>;
    lastName?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
    phoneNumber?: Resolver<Maybe<GQLResolversTypes['PhoneNumber']>, ParentType, ContextType>;
    profilePictureUrl?: Resolver<Maybe<GQLResolversTypes['Url']>, ParentType, ContextType>;
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
    Allergy?: GQLAllergyResolvers<ContextType>;
    AllergyMutation?: GQLAllergyMutationResolvers<ContextType>;
    AllergyQuery?: GQLAllergyQueryResolvers<ContextType>;
    AnonymousSession?: GQLAnonymousSessionResolvers<ContextType>;
    AnonymousUser?: GQLAnonymousUserResolvers<ContextType>;
    Category?: GQLCategoryResolvers<ContextType>;
    CategoryMutation?: GQLCategoryMutationResolvers<ContextType>;
    CategoryQuery?: GQLCategoryQueryResolvers<ContextType>;
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
    PhoneNumber?: GraphQLScalarType;
    Price?: GQLPriceResolvers<ContextType>;
    PublicUser?: GQLPublicUserResolvers<ContextType>;
    Query?: GQLQueryResolvers<ContextType>;
    Session?: GQLSessionResolvers<ContextType>;
    SessionMutation?: GQLSessionMutationResolvers<ContextType>;
    UInt?: GraphQLScalarType;
    UUID?: GraphQLScalarType;
    Upload?: GraphQLScalarType;
    Url?: GraphQLScalarType;
    User?: GQLUserResolvers<ContextType>;
    UserMutation?: GQLUserMutationResolvers<ContextType>;
    UserQuery?: GQLUserQueryResolvers<ContextType>;
    UserSessionMutation?: GQLUserSessionMutationResolvers<ContextType>;
    UserSessionQuery?: GQLUserSessionQueryResolvers<ContextType>;
};
