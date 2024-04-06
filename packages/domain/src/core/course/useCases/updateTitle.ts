import { Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface UpdateCourseTitleInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookId: NanoId; menuId: NanoId; courseId: NanoId; title: string };
}

export async function updateTitle({ dataSourceAdapter, logger, context, request }: UpdateCourseTitleInput): Promise<boolean> {
    const { cookId, menuId, courseId, title } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.courseRepository.updateOne({ cookId, menuId, courseId }, { title });

    return success;
}
