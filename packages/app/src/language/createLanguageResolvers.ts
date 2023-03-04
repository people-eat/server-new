import { Authorization, Service } from '@people-eat/server-domain';
import { GQLLanguage, GQLLanguageMutation, GQLLanguageMutationCreateOneArgs, GQLLanguageQuery } from '../generated.js';
import { Resolvers } from '../Resolvers.js';

export function createLanguageResolvers(service: Service): Resolvers<'LanguageQuery' | 'LanguageMutation' | 'Language'> {
    return {
        LanguageQuery: {
            findMany: async (
                _parent: GQLLanguageQuery,
                _input: unknown,
                context: Authorization.Context,
            ): Promise<GQLLanguage[] | undefined> => service.language.findMany(context, {}),
        },
        LanguageMutation: {
            createOne: async (
                _parent: GQLLanguageMutation,
                { request }: GQLLanguageMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.language.createOne(context, request),
        },
        Language: {},
    };
}
