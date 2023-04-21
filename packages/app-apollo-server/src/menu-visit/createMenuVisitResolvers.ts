import { type Resolvers } from '../Resolvers';

export function createMenuVisitResolvers(): Resolvers<'CookVisit' | 'UserCookVisitQuery' | 'CookCookVisitQuery'> {
    return {
        CookCookVisitQuery: {},
        CookVisit: {},
        UserCookVisitQuery: {},
    };
}
