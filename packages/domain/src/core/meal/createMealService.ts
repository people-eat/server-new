import { type ReadStream } from 'fs';
import { type Authorization, type DataSource, type Logger } from '../..';
import { type FindManyRequest, type MealType, type NanoId } from '../shared';
import { type CreateOneMealRequest } from './CreateOneMealRequest';
import { type Meal } from './Meal';
import { createOne } from './useCases/createOne';
import { deleteOne } from './useCases/deleteOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';
import { updateDescription } from './useCases/updateDescription';
import { updateImage } from './useCases/updateImage';
import { updateTitle } from './useCases/updateTitle';
import { updateType } from './useCases/updateType';

export interface MealService {
    findOne(context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId }): Promise<Meal | undefined>;
    findMany(context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }): Promise<Meal[] | undefined>;
    createOne(
        context: Authorization.Context,
        request: { cookId: NanoId; meal: CreateOneMealRequest } & { image?: ReadStream },
    ): Promise<boolean>;
    deleteOne(context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId }): Promise<boolean>;
    updateTitle(context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId; title: string }): Promise<boolean>;
    updateDescription(context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId; description: string }): Promise<boolean>;
    updateImage(context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId; image?: ReadStream }): Promise<boolean>;
    updateType(context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId; type: MealType }): Promise<boolean>;
}

export interface CreateMealServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    serverUrl: string;
}

export function createMealService({ dataSourceAdapter, logger, serverUrl }: CreateMealServiceInput): MealService {
    return {
        findOne: (context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId }) =>
            findOne({ dataSourceAdapter, logger, context, request }),
        findMany: (context: Authorization.Context, request: FindManyRequest & { cookId: NanoId }) =>
            findMany({ dataSourceAdapter, logger, context, request }),
        createOne: (context: Authorization.Context, request: { cookId: NanoId; meal: CreateOneMealRequest } & { image?: ReadStream }) =>
            createOne({ dataSourceAdapter, logger, serverUrl, context, request }),
        deleteOne: (context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId }) =>
            deleteOne({ dataSourceAdapter, logger, context, request }),
        updateTitle: (context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId; title: string }) =>
            updateTitle({ dataSourceAdapter, logger, context, request }),
        updateDescription: (context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId; description: string }) =>
            updateDescription({ dataSourceAdapter, logger, context, request }),
        updateImage: (context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId; image?: ReadStream }) =>
            updateImage({ dataSourceAdapter, logger, serverUrl, context, request }),
        updateType: (context: Authorization.Context, request: { cookId: NanoId; mealId: NanoId; type: MealType }) =>
            updateType({ dataSourceAdapter, logger, context, request }),
    };
}
