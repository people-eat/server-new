import bcrypt from 'bcryptjs';
import { Authorization } from '../../..';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';

export interface UpdateCookIsVisibleInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: {
        userId: NanoId;
        password: string;
    };
}

export async function updatePassword({
    runtime: { dataSourceAdapter, logger },
    context,
    request,
}: UpdateCookIsVisibleInput): Promise<boolean> {
    const { userId, password } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.userRepository.updateOne(
        { userId },
        { password: bcrypt.hashSync(password, bcrypt.genSaltSync()) },
    );

    return success;
}
