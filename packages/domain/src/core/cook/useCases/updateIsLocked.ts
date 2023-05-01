import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCookIsLockedInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        isLocked: boolean;
    };
}

export async function updateIsLocked({ dataSourceAdapter, logger, context, request }: UpdateCookIsLockedInput): Promise<boolean> {
    const { cookId, isLocked } = request;

    await Authorization.isAdmin({ context, dataSourceAdapter, logger });

    const success: boolean = await dataSourceAdapter.cookRepository.updateOne({ cookId }, { isLocked });

    return success;
}
