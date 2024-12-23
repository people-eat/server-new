import { type Authorization, type Service } from '@people-eat/server-domain';
import { type GQLLocationQuery, type GQLLocationQueryFindArgs, type GQLLocationSuggestion } from '../generated';
import { type Resolvers } from '../Resolvers';

export function createLocationResolvers(service: Service): Resolvers<'LocationQuery'> {
    return {
        LocationQuery: {
            find: async (
                _parent: GQLLocationQuery,
                { searchText }: GQLLocationQueryFindArgs,
                context: Authorization.Context,
            ): Promise<GQLLocationSuggestion[]> => service.location.find(context, { searchText }),
        },
    };
}
