import { type Authorization, type DataSource, type Logger } from '../../..';
import { type NanoId } from '../../shared';

export interface FindOneMenuImageUrlsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { menuId: NanoId };
}

export async function findImageUrls({ dataSourceAdapter, request }: FindOneMenuImageUrlsInput): Promise<string[]> {
    const { menuId } = request;

    const imageUrls: { imageUrl: string }[] = await dataSourceAdapter.query(`
        SELECT Meals.imageUrl FROM Courses
        LEFT JOIN MealOptions ON Courses.courseId = MealOptions.courseId
        LEFT JOIN Meals ON MealOptions.mealId = Meals.mealId
        WHERE Courses.menuId = '${menuId}' AND Meals.imageUrl IS NOT NULL
    `);

    return imageUrls.map(({ imageUrl }: { imageUrl: string }) => imageUrl);
}
