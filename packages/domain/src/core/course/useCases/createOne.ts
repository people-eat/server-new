import { Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneCourseRequest } from '../CreateOneCourseRequest';

export interface CreateOneCourseInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneCourseRequest & { cookId: NanoId; menuId: NanoId };
}

export async function createOne({ dataSourceAdapter, logger, context, request }: CreateOneCourseInput): Promise<boolean> {
    const { title, index, cookId, menuId } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const courseId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.courseRepository.insertOne({
        courseId,
        cookId,
        menuId,
        title: title.trim(),
        index,
    });

    return success;
}
