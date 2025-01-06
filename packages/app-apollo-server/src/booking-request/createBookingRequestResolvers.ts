import { type Authorization, type Service } from '@people-eat/server-domain';
import { type UserCreateOneBookingRequestResponse } from '../../../domain/src/core/booking-request/CreateOneBookingRequestRequest';
import {
    type GQLBookingRequest,
    type GQLBookingRequestQuery,
    type GQLConfiguredMenu,
    type GQLCook,
    type GQLCookBookingRequestMutation,
    type GQLCookBookingRequestMutationAcceptArgs,
    type GQLCookBookingRequestMutationChatMessagesArgs,
    type GQLCookBookingRequestMutationCreateOneArgs,
    type GQLCookBookingRequestMutationDeclineArgs,
    type GQLCookBookingRequestMutationUpdateSuggestedMenuArgs,
    type GQLCookBookingRequestQuery,
    type GQLCookBookingRequestQueryChatMessagesArgs,
    type GQLCookBookingRequestQueryFindOneArgs,
    type GQLPublicCook,
    type GQLPublicMenu,
    type GQLPublicUser,
    type GQLUser,
    type GQLUserBookingRequestCreatePaymentSetupResponse,
    type GQLUserBookingRequestMutation,
    type GQLUserBookingRequestMutationAcceptArgs,
    type GQLUserBookingRequestMutationChatMessagesArgs,
    type GQLUserBookingRequestMutationConfirmPaymentSetupArgs,
    type GQLUserBookingRequestMutationCreateOneArgs,
    type GQLUserBookingRequestMutationCreatePaymentSetupArgs,
    type GQLUserBookingRequestMutationUpdateConfiguredMenuArgs,
    type GQLUserBookingRequestMutationUpdateDateTimeArgs,
    type GQLUserBookingRequestMutationUpdateLocationArgs,
    type GQLUserBookingRequestMutationUpdateParticipantsArgs,
    type GQLUserBookingRequestQuery,
    type GQLUserBookingRequestQueryChatMessagesArgs,
    type GQLUserBookingRequestQueryFindOneArgs,
    type GQLUserCreateOneBookingRequestResponse,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createBookingRequestResolvers(
    service: Service,
): Resolvers<
    | 'BookingRequest'
    | 'UserBookingRequestMutation'
    | 'UserBookingRequestQuery'
    | 'CookBookingRequestMutation'
    | 'CookBookingRequestQuery'
    | 'BookingRequestQuery'
    | 'UserCreateOneBookingRequestResponse'
    | 'UserBookingRequestCreatePaymentSetupResponse'
> {
    return {
        BookingRequest: {
            publicUser: async ({ userId }: GQLBookingRequest, _input: unknown, context: Authorization.Context): Promise<GQLPublicUser> =>
                service.publicUser.findOne(context, userId) as any,
            publicCook: async ({ cookId }: GQLBookingRequest, _input: unknown, context: Authorization.Context): Promise<GQLPublicCook> =>
                service.publicCook.findOne(context, cookId, false) as any,
            user: async ({ userId }: GQLBookingRequest, _input: unknown, context: Authorization.Context): Promise<GQLUser> =>
                service.user.findOneByUserId(context, { userId }) as any,
            cook: async ({ cookId }: GQLBookingRequest, _input: unknown, context: Authorization.Context): Promise<GQLCook> =>
                service.cook.findOne(context, cookId) as any,
            suggestedMenu: async (
                { suggestedMenuId }: GQLBookingRequest,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLPublicMenu | undefined> => {
                // maybe don't restrict to public menus
                return suggestedMenuId ? ((await service.publicMenu.findOne(context, suggestedMenuId)) as any) : undefined;
            },
            configuredMenu: async (
                { bookingRequestId }: GQLBookingRequest,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLConfiguredMenu | undefined> => service.configuredMenu.findOne(context, { bookingRequestId }),
        },
        UserBookingRequestMutation: {
            createOne: async (
                { userId }: GQLUserBookingRequestMutation,
                { request }: GQLUserBookingRequestMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<GQLUserCreateOneBookingRequestResponse> => {
                if (request.cook) return service.bookingRequest.createOne(context, { userId, ...request.cook });
                if (request.menu) return service.bookingRequest.createOne(context, { userId, ...request.menu });
                return {
                    reason: '',
                };
            },
            accept: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId }: GQLUserBookingRequestMutationAcceptArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.acceptOneByUserId(context, { userId, bookingRequestId }),
            decline: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId }: GQLUserBookingRequestMutationAcceptArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.declineOneByUserId(context, { userId, bookingRequestId }),
            updateLocation: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId, location }: GQLUserBookingRequestMutationUpdateLocationArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.updateLocation(context, { userId, bookingRequestId, location }),
            updateParticipants: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId, adults, children }: GQLUserBookingRequestMutationUpdateParticipantsArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.updateParticipants(context, { userId, bookingRequestId, adults, children }),
            updateDateTime: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId, dateTime }: GQLUserBookingRequestMutationUpdateDateTimeArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.updateDateTime(context, { userId, bookingRequestId, dateTime }),
            confirmPaymentSetup: (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId }: GQLUserBookingRequestMutationConfirmPaymentSetupArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.confirmPaymentSetup(context, { userId, bookingRequestId }),
            createPaymentSetup: (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId }: GQLUserBookingRequestMutationCreatePaymentSetupArgs,
                context: Authorization.Context,
            ): Promise<GQLUserBookingRequestCreatePaymentSetupResponse> =>
                service.bookingRequest.createPaymentSetup(context, { userId, bookingRequestId }),
            updateConfiguredMenu: async (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId, configuredMenu }: GQLUserBookingRequestMutationUpdateConfiguredMenuArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.configuredMenu.createOne(context, { userId, bookingRequestId, configuredMenu }),

            chatMessages: (
                { userId }: GQLUserBookingRequestMutation,
                { bookingRequestId }: GQLUserBookingRequestMutationChatMessagesArgs,
            ) => ({ userId, bookingRequestId } as any),
        },
        UserBookingRequestQuery: {
            findMany: async (
                { userId }: GQLUserBookingRequestQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest[] | undefined> => service.bookingRequest.findManyByUserId(context, { userId }) as any,
            findOne: async (
                { userId }: GQLUserBookingRequestQuery,
                { bookingRequestId }: GQLUserBookingRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest | undefined> =>
                service.bookingRequest.findOneByUserId(context, { userId, bookingRequestId }) as any,

            chatMessages: ({ userId }: GQLUserBookingRequestQuery, { bookingRequestId }: GQLUserBookingRequestQueryChatMessagesArgs) =>
                ({ userId, bookingRequestId } as any),
        },
        CookBookingRequestMutation: {
            createOne: async (
                { cookId }: GQLCookBookingRequestMutation,
                { globalBookingRequestId, configuredMenu, price }: GQLCookBookingRequestMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<GQLUserCreateOneBookingRequestResponse> =>
                service.bookingRequest.createOneByGlobalBookingRequestId(context, {
                    cookId,
                    globalBookingRequestId,
                    configuredMenu,
                    price,
                }),
            accept: async (
                { cookId }: GQLCookBookingRequestMutation,
                { bookingRequestId }: GQLCookBookingRequestMutationAcceptArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.acceptOneByCookId(context, { cookId, bookingRequestId }),
            decline: async (
                { cookId }: GQLCookBookingRequestMutation,
                { bookingRequestId }: GQLCookBookingRequestMutationDeclineArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.declineOneByCookId(context, { cookId, bookingRequestId }),
            updateSuggestedMenu: async (
                { cookId }: GQLCookBookingRequestMutation,
                { bookingRequestId, suggestedMenuId }: GQLCookBookingRequestMutationUpdateSuggestedMenuArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.bookingRequest.updateSuggestedMenu(context, { cookId, bookingRequestId, suggestedMenuId }),

            chatMessages: (
                { cookId }: GQLCookBookingRequestMutation,
                { bookingRequestId }: GQLCookBookingRequestMutationChatMessagesArgs,
            ) => ({ cookId, bookingRequestId } as any),
        },
        CookBookingRequestQuery: {
            findMany: async (
                { cookId }: GQLCookBookingRequestQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest[] | undefined> => service.bookingRequest.findManyByCookId(context, { cookId }) as any,
            findOne: async (
                { cookId }: GQLCookBookingRequestQuery,
                { bookingRequestId }: GQLCookBookingRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest | undefined> =>
                service.bookingRequest.findOneByCookId(context, { cookId, bookingRequestId }) as any,

            chatMessages: ({ cookId }: GQLCookBookingRequestQuery, { bookingRequestId }: GQLCookBookingRequestQueryChatMessagesArgs) =>
                ({ cookId, bookingRequestId } as any),
        },
        BookingRequestQuery: {
            findMany: async (
                _parent: GQLBookingRequestQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest[] | undefined> => service.bookingRequest.findMany(context, {}) as any,
            findOne: async (
                _parent: GQLBookingRequestQuery,
                { bookingRequestId }: GQLCookBookingRequestQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLBookingRequest | undefined> => service.bookingRequest.findOne(context, { bookingRequestId }) as any,
        },

        UserCreateOneBookingRequestResponse: {
            __resolveType: (
                obj: UserCreateOneBookingRequestResponse,
            ): 'UserCreateOneBookingRequestSuccessResponse' | 'UserCreateOneBookingRequestFailedResponse' => {
                if ('bookingRequestId' in obj) return 'UserCreateOneBookingRequestSuccessResponse';
                return 'UserCreateOneBookingRequestFailedResponse';
            },
        },
        UserBookingRequestCreatePaymentSetupResponse: {
            __resolveType: (
                obj: GQLUserBookingRequestCreatePaymentSetupResponse,
            ): 'UserBookingRequestCreatePaymentSetupSuccessResponse' | 'UserBookingRequestCreatePaymentSetupFailedResponse' => {
                if ('stripeClientSecret' in obj) return 'UserBookingRequestCreatePaymentSetupSuccessResponse';
                return 'UserBookingRequestCreatePaymentSetupFailedResponse';
            },
        },
    };
}
