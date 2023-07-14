import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLChatMessage,
    type GQLCookBookingRequestChatMessageMutation,
    type GQLCookBookingRequestChatMessageMutationCreateOneArgs,
    type GQLCookBookingRequestChatMessageQuery,
    type GQLUserBookingRequestChatMessageMutation,
    type GQLUserBookingRequestChatMessageMutationCreateOneArgs,
    type GQLUserBookingRequestChatMessageQuery,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createChatMessageResolvers(
    service: Service,
): Resolvers<
    | 'ChatMessage'
    | 'CookBookingRequestChatMessageMutation'
    | 'CookBookingRequestChatMessageQuery'
    | 'UserBookingRequestChatMessageMutation'
    | 'UserBookingRequestChatMessageQuery'
> {
    return {
        ChatMessage: {},
        CookBookingRequestChatMessageMutation: {
            createOne: async (
                { cookId, bookingRequestId }: GQLCookBookingRequestChatMessageMutation,
                { request }: GQLCookBookingRequestChatMessageMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.chatMessage.createOneByCookId(context, { cookId, bookingRequestId, ...request }),
        },
        CookBookingRequestChatMessageQuery: {
            findMany: async (
                { cookId, bookingRequestId }: GQLCookBookingRequestChatMessageQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLChatMessage[] | undefined> => service.chatMessage.findManyByCookId(context, { cookId, bookingRequestId }) as any,
        },
        UserBookingRequestChatMessageMutation: {
            createOne: async (
                { userId, bookingRequestId }: GQLUserBookingRequestChatMessageMutation,
                { request }: GQLUserBookingRequestChatMessageMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.chatMessage.createOneByUserId(context, { userId, bookingRequestId, ...request }),
        },
        UserBookingRequestChatMessageQuery: {
            findMany: async (
                { userId, bookingRequestId }: GQLUserBookingRequestChatMessageQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLChatMessage[] | undefined> => service.chatMessage.findManyByUserId(context, { userId, bookingRequestId }) as any,
        },
    };
}
