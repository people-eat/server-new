import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type CreateOneMealOptionRequest } from './CreateOneMealOptionRequest';
import { createMany } from './useCases/createMany';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';

export interface MealOptionService {
    createOne(context: Authorization.Context, request: CreateOneMealOptionRequest & { cookId: NanoId; courseId: NanoId }): Promise<boolean>;
    createMany(
        context: Authorization.Context,
        request: { cookId: NanoId; courseId: NanoId; mealOptions: CreateOneMealOptionRequest[] },
    ): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { cookId: NanoId; courseId: NanoId; mealId: NanoId }): Promise<boolean>;
}

export function createMealOptionService({ dataSourceAdapter, logger }: Runtime): MealOptionService {
    return {
        createOne: (context: Authorization.Context, request: CreateOneMealOptionRequest & { cookId: NanoId; courseId: NanoId }) =>
            createOne({ dataSourceAdapter, logger, context, request }),
        createMany: (
            context: Authorization.Context,
            request: { cookId: NanoId; courseId: NanoId; mealOptions: CreateOneMealOptionRequest[] },
        ) => createMany({ dataSourceAdapter, logger, context, request }),
        deleteOne: (context: Authorization.Context, request: { cookId: NanoId; courseId: NanoId; mealId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
    };
}
