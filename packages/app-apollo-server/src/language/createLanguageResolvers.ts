import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLLanguage, type GQLLanguageQuery } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createLanguageResolvers(service: Service): Resolvers<'Language' | 'LanguageMutation' | 'LanguageQuery'> {
    return {
        Language: {},
        LanguageMutation: {},
        LanguageQuery: {
            findAll: async (_parent: GQLLanguageQuery, _input: unknown, context: Authorization.Context): Promise<GQLLanguage[]> =>
                service.language.findMany(context, {}) as any,
        },
    };
}
