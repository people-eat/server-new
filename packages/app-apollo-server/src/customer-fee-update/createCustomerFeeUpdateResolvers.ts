import { type Resolvers } from '../Resolvers';

export function createCustomerFeeUpdateResolvers(): Resolvers<
    'CustomerFeeUpdate' | 'CustomerFeeUpdateMutation' | 'CustomerFeeUpdateQuery'
> {
    return {
        CustomerFeeUpdate: {},
        CustomerFeeUpdateMutation: {},
        CustomerFeeUpdateQuery: {},
    };
}
