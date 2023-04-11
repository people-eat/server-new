import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCook,
    type GQLCookMutation,
    type GQLCookMutationAddOneLanguageArgs,
    type GQLCookMutationCreateOneArgs,
    type GQLCookMutationRemoveOneLanguageArgs,
    type GQLCookMutationUpdateBiographyArgs,
    type GQLCookMutationUpdateIsLockedArgs,
    type GQLCookMutationUpdateIsVisibleArgs,
    type GQLCookMutationUpdateLocationArgs,
    type GQLCookMutationUpdateMaximumParticipantsArgs,
    type GQLCookMutationUpdateMaximumPriceArgs,
    type GQLCookMutationUpdateMaximumTravelDistanceArgs,
    type GQLCookMutationUpdateMinimumParticipantsArgs,
    type GQLCookMutationUpdateMinimumPriceArgs,
    type GQLCookMutationUpdateRankArgs,
    type GQLCookMutationUpdateTravelExpensesArgs,
    type GQLCookQuery,
    type GQLCookQueryFindManyArgs,
    type GQLCookQueryFindOneArgs,
    type GQLLanguage,
    type GQLUser,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createCookResolvers(service: Service): Resolvers<'Cook' | 'CookMutation' | 'CookQuery'> {
    return {
        Cook: {
            user: async ({ cookId }: GQLCook, _input: unknown, context: Authorization.Context): Promise<GQLUser> =>
                service.user.findOneByUserId(context, { userId: cookId }) as any,
            languages: async ({ cookId }: GQLCook, _input: unknown, context: Authorization.Context): Promise<GQLLanguage[]> =>
                service.cookLanguage.findAll(context, { cookId }) as any,
        },
        CookMutation: {
            createOne: async (
                _parent: GQLCookMutation,
                { cookId, request }: GQLCookMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.createOne(context, cookId, request),

            updateIsLocked: async (
                _parent: GQLCookMutation,
                { cookId, isLocked }: GQLCookMutationUpdateIsLockedArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateIsLocked(context, cookId, isLocked),

            updateIsVisible: async (
                _parent: GQLCookMutation,
                { cookId, isVisible }: GQLCookMutationUpdateIsVisibleArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateIsVisible(context, cookId, isVisible),

            updateLocation: async (
                _parent: GQLCookMutation,
                { cookId, location }: GQLCookMutationUpdateLocationArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateLocation(context, cookId, location),

            updateRank: async (
                _parent: GQLCookMutation,
                { cookId, rank }: GQLCookMutationUpdateRankArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateRank(context, cookId, rank),

            updateBiography: async (
                _parent: GQLCookMutation,
                { cookId, biography }: GQLCookMutationUpdateBiographyArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateBiography(context, cookId, biography),

            updateTravelExpenses: async (
                _parent: GQLCookMutation,
                { cookId, travelExpenses }: GQLCookMutationUpdateTravelExpensesArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateTravelExpenses(context, cookId, travelExpenses),

            updateMaximumTravelDistance: async (
                _parent: GQLCookMutation,
                { cookId, maximumTravelDistance }: GQLCookMutationUpdateMaximumTravelDistanceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMaximumTravelDistance(context, cookId, maximumTravelDistance),

            updateMinimumPrice: async (
                _parent: GQLCookMutation,
                { cookId, minimumPrice }: GQLCookMutationUpdateMinimumPriceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMinimumPrice(context, cookId, minimumPrice),

            updateMaximumPrice: async (
                _parent: GQLCookMutation,
                { cookId, maximumPrice }: GQLCookMutationUpdateMaximumPriceArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMaximumPrice(context, cookId, maximumPrice),

            updateMinimumParticipants: async (
                _parent: GQLCookMutation,
                { cookId, minimumParticipants }: GQLCookMutationUpdateMinimumParticipantsArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMinimumParticipants(context, cookId, minimumParticipants),

            updateMaximumParticipants: async (
                _parent: GQLCookMutation,
                { cookId, maximumParticipants }: GQLCookMutationUpdateMaximumParticipantsArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cook.updateMaximumParticipants(context, cookId, maximumParticipants),

            addOneLanguage: async (
                _parent: GQLCookMutation,
                { cookId, languageId }: GQLCookMutationAddOneLanguageArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cookLanguage.createOne(context, { cookId, languageId }),

            removeOneLanguage: async (
                _parent: GQLCookMutation,
                { cookId, languageId }: GQLCookMutationRemoveOneLanguageArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.cookLanguage.deleteOne(context, { cookId, languageId }),
        },
        CookQuery: {
            findOne: async (
                _parent: GQLCookQuery,
                { cookId }: GQLCookQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLCook | undefined> => service.cook.findOne(context, cookId) as any,

            findMany: async (
                _parent: GQLCookQuery,
                { request }: GQLCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLCook[]> => service.cook.findMany(context, request) as any,
        },
    };
}