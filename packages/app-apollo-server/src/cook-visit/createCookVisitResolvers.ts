import { type Resolvers } from '../Resolvers';

export function createCookVisitResolvers(): Resolvers<'CookVisit' | 'UserCookVisitQuery' | 'CookCookVisitQuery'> {
    return {
        CookCookVisitQuery: {},
        CookVisit: {},
        UserCookVisitQuery: {},
    };
}
