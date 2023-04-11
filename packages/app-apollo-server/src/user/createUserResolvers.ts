import { type Admin, type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLUser,
    type GQLUserMutation,
    type GQLUserMutationCreateOneByEmailAddressArgs,
    type GQLUserMutationCreateOneByIdentityProviderArgs,
    type GQLUserMutationCreateOneByPhoneNumberArgs,
    type GQLUserMutationSessionsArgs,
    type GQLUserMutationUpdateGenderArgs,
    type GQLUserMutationUpdatePasswordArgs,
    type GQLUserMutationUpdateProfilePictureArgs,
    type GQLUserQuery,
    type GQLUserQueryFindManyArgs,
    type GQLUserQueryFindOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createUserResolvers(service: Service): Resolvers<'User' | 'UserMutation' | 'UserQuery'> {
    return {
        User: {
            admin: ({ userId }: GQLUser, _input: unknown, context: Authorization.Context) =>
                service.admin.findOne(context, { adminId: userId }) as any,
            isAdmin: async ({ userId }: GQLUser, _input: unknown, context: Authorization.Context): Promise<boolean> => {
                const admin: Admin | undefined = await service.admin.findOne(context, { adminId: userId });
                return Boolean(admin);
            },
        },
        UserMutation: {
            createOneByEmailAddress: async (
                _parent: GQLUserMutation,
                { request, profilePicture }: GQLUserMutationCreateOneByEmailAddressArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                service.user.createOneByEmailAddress(context, {
                    ...request,
                    profilePicture: profilePicture && (await profilePicture).createReadStream(),
                }),

            createOneByPhoneNumber: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByPhoneNumberArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.createOneByPhoneNumber(context, request),

            createOneByIdentityProvider: async (
                _parent: GQLUserMutation,
                { request }: GQLUserMutationCreateOneByIdentityProviderArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.createOneByIdentityProvider(context, request),

            updatePassword: async (
                _parent: GQLUserMutation,
                request: GQLUserMutationUpdatePasswordArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.updatePassword(context, request),

            updateGender: async (
                _parent: GQLUserMutation,
                request: GQLUserMutationUpdateGenderArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.user.updateGender(context, request),

            updateProfilePicture: async (
                _parent: GQLUserMutation,
                { userId, profilePicture }: GQLUserMutationUpdateProfilePictureArgs,
                context: Authorization.Context,
            ): Promise<boolean> =>
                service.user.updateProfilePicture(context, {
                    userId,
                    profilePicture: profilePicture && (await profilePicture).createReadStream(),
                }),

            sessions: (_parent: GQLUserMutation, { userId }: GQLUserMutationSessionsArgs) => ({ userId } as any),
        },
        UserQuery: {
            findMany: async (
                _parent: GQLUserQuery,
                { request }: GQLUserQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLUser[] | undefined> => service.user.findMany(context, request) as any,

            findOne: async (
                _parent: GQLUserQuery,
                { userId }: GQLUserQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLUser | undefined> => service.user.findOneByUserId(context, { userId }) as any,

            me: async (_parent: GQLUserQuery, _input: unknown, context: Authorization.Context): Promise<GQLUser | undefined> => {
                const { userId } = context;

                if (!userId) return undefined;

                return service.user.findOneByUserId(context, { userId }) as any;
            },
        },
    };
}
