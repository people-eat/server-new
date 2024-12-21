import { Authorization } from '../../..';
import { type DBBookingRequest, type DBCook, type DBUser } from '../../../data-source';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateSuggestedMenuInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { cookId: NanoId; bookingRequestId: NanoId; suggestedMenuId: NanoId };
}

// eslint-disable-next-line max-statements
export async function updateSuggestedMenu({ runtime, context, request }: UpdateSuggestedMenuInput): Promise<boolean> {
    const { dataSourceAdapter, logger } = runtime;
    const { cookId, bookingRequestId, suggestedMenuId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const bookingRequest: DBBookingRequest | undefined = await dataSourceAdapter.bookingRequestRepository.findOne({
        cookId,
        bookingRequestId,
    });

    if (!bookingRequest) return false;

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: bookingRequest.userId });

    if (!user) return false;

    const cook: DBCook | undefined = await dataSourceAdapter.cookRepository.findOne({ cookId: bookingRequest.cookId });

    if (!cook) return false;

    // maybe everything above can be removed - depends on notifications

    const updateSuccess: boolean = await dataSourceAdapter.bookingRequestRepository.updateOne(
        { bookingRequestId, cookId },
        { suggestedMenuId },
    );

    if (!updateSuccess) return false;

    return true;
}
