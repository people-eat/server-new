import bcrypt from 'bcryptjs';
import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookIsVisibleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        userId: NanoId;
        password: string;
    };
}

export async function updatePassword({ dataSourceAdapter, logger, context, request }: UpdateCookIsVisibleInput): Promise<boolean> {
    const { userId, password } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const success: boolean = await dataSourceAdapter.userRepository.updateOne(
        { userId },
        { password: bcrypt.hashSync(password, bcrypt.genSaltSync()) },
    );

    return success;
}
