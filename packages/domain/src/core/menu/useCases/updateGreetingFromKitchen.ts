import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateMenuGreetingFromKitchenInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: {
        cookId: NanoId;
        menuId: NanoId;
        greetingFromKitchen?: string;
    };
}

export async function updateGreetingFromKitchen({
    dataSourceAdapter,
    logger,
    context,
    request,
}: UpdateMenuGreetingFromKitchenInput): Promise<boolean> {
    const { cookId, menuId, greetingFromKitchen } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.menuRepository.updateOne(
        { cookId, menuId },
        { greetingFromKitchen: greetingFromKitchen?.trim() },
    );

    return success;
}
