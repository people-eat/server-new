import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLLanguage,
    type GQLPublicCook,
    type GQLPublicCookQuery,
    type GQLPublicCookQueryFindManyArgs,
    type GQLPublicCookQueryFindOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createPublicCookResolvers(service: Service): Resolvers<'PublicCook' | 'PublicCookQuery'> {
    return {
        PublicCook: {
            languages: async ({ cookId }: GQLPublicCook, _input: unknown, context: Authorization.Context): Promise<GQLLanguage[]> =>
                service.cookLanguage.findAll(context, { cookId }) as any,
        },
        PublicCookQuery: {
            findOne: async (
                _parent: GQLPublicCookQuery,
                { cookId }: GQLPublicCookQueryFindOneArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook | undefined> => service.publicCook.findOne(context, cookId) as any,

            findMany: async (
                _parent: GQLPublicCookQuery,
                { request: _request }: GQLPublicCookQueryFindManyArgs,
                context: Authorization.Context,
            ): Promise<GQLPublicCook[]> => service.publicCook.findMany(context) as any,
        },
    };
}
