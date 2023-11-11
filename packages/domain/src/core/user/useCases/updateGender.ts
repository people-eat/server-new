import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type Gender, type NanoId } from '../../shared';

export interface UpdateCookIsVisibleInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        userId: NanoId;
        gender: Gender;
    };
}

export async function updateGender({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: UpdateCookIsVisibleInput): Promise<boolean> {
    const { userId, gender } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.userRepository.updateOne({ userId }, { gender });

    return success;
}
