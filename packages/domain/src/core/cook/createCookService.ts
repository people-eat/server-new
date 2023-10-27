import { type Authorization, type Cook, type DataSource, type Email, type Logger, type SMS } from '../..';
import { type CookRank, type FindManyRequest, type Location } from '../shared';
import { type CreateOneCookRequest } from './CreateOneCookRequest';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';
import { updateBiography } from './useCases/updateBiography';
import { updateIsLocked } from './useCases/updateIsLocked';
import { updateIsVisible } from './useCases/updateIsVisible';
import { updateLocation } from './useCases/updateLocation';
import { updateMaximumParticipants } from './useCases/updateMaximumParticipants';
import { updateMaximumPrice } from './useCases/updateMaximumPrice';
import { updateMaximumTravelDistance } from './useCases/updateMaximumTravelDistance';
import { updateMinimumParticipants } from './useCases/updateMinimumParticipants';
import { updateMinimumPrice } from './useCases/updateMinimumPrice';
import { updateRank } from './useCases/updateRank';
import { updateTravelExpenses } from './useCases/updateTravelExpenses';

export interface CookService {
    findMany(context: Authorization.Context, request: FindManyRequest): Promise<Cook[] | undefined>;
    findOne(context: Authorization.Context, cookId: string): Promise<Cook | undefined>;
    createOne(context: Authorization.Context, cookId: string, request: CreateOneCookRequest): Promise<boolean>;
    updateIsLocked(context: Authorization.Context, cookId: string, isLocked: boolean): Promise<boolean>;
    updateIsVisible(context: Authorization.Context, cookId: string, isVisible: boolean): Promise<boolean>;
    updateLocation(context: Authorization.Context, cookId: string, location: Location): Promise<boolean>;
    updateRank(context: Authorization.Context, cookId: string, rank: CookRank): Promise<boolean>;
    updateBiography(context: Authorization.Context, cookId: string, biography: string): Promise<boolean>;
    updateTravelExpenses(context: Authorization.Context, cookId: string, travelExpenses: number): Promise<boolean>;
    updateMaximumTravelDistance(context: Authorization.Context, cookId: string, maximumTravelDistance?: number): Promise<boolean>;
    updateMinimumPrice(context: Authorization.Context, cookId: string, minimumPrice?: number): Promise<boolean>;
    updateMaximumPrice(context: Authorization.Context, cookId: string, maximumPrice?: number): Promise<boolean>;
    updateMinimumParticipants(context: Authorization.Context, cookId: string, minimumParticipants?: number): Promise<boolean>;
    updateMaximumParticipants(context: Authorization.Context, cookId: string, maximumParticipants?: number): Promise<boolean>;
}

export interface CreateCookServiceInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    smsAdapter: SMS.Adapter;
}

export function createCookService({ dataSourceAdapter, emailAdapter, logger }: CreateCookServiceInput): CookService {
    return {
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ dataSourceAdapter, logger, context, request }),
        findOne: (context: Authorization.Context, cookId: string) => findOne({ dataSourceAdapter, logger, context, request: { cookId } }),
        createOne: (context: Authorization.Context, cookId: string, request: CreateOneCookRequest) =>
            createOne({ dataSourceAdapter, logger, emailAdapter, context, request: { cookId, ...request } }),
        updateIsLocked: (context: Authorization.Context, cookId: string, isLocked: boolean) =>
            updateIsLocked({ dataSourceAdapter, logger, context, request: { cookId, isLocked } }),
        updateIsVisible: (context: Authorization.Context, cookId: string, isVisible: boolean) =>
            updateIsVisible({ dataSourceAdapter, logger, context, request: { cookId, isVisible } }),
        updateLocation: (context: Authorization.Context, cookId: string, location: Location) =>
            updateLocation({ dataSourceAdapter, logger, context, request: { cookId, location } }),
        updateRank: (context: Authorization.Context, cookId: string, rank: CookRank) =>
            updateRank({ dataSourceAdapter, logger, context, request: { cookId, rank } }),
        updateBiography: (context: Authorization.Context, cookId: string, biography: string) =>
            updateBiography({ dataSourceAdapter, logger, context, request: { cookId, biography } }),
        updateTravelExpenses: (context: Authorization.Context, cookId: string, travelExpenses: number) =>
            updateTravelExpenses({ dataSourceAdapter, logger, context, request: { cookId, travelExpenses } }),
        updateMaximumTravelDistance: (context: Authorization.Context, cookId: string, maximumTravelDistance?: number) =>
            updateMaximumTravelDistance({ dataSourceAdapter, logger, context, request: { cookId, maximumTravelDistance } }),
        updateMinimumPrice: (context: Authorization.Context, cookId: string, minimumPrice?: number) =>
            updateMinimumPrice({ dataSourceAdapter, logger, context, request: { cookId, minimumPrice } }),
        updateMaximumPrice: (context: Authorization.Context, cookId: string, maximumPrice?: number) =>
            updateMaximumPrice({ dataSourceAdapter, logger, context, request: { cookId, maximumPrice } }),
        updateMinimumParticipants: (context: Authorization.Context, cookId: string, minimumParticipants?: number) =>
            updateMinimumParticipants({ dataSourceAdapter, logger, context, request: { cookId, minimumParticipants } }),
        updateMaximumParticipants: (context: Authorization.Context, cookId: string, maximumParticipants?: number) =>
            updateMaximumParticipants({ dataSourceAdapter, logger, context, request: { cookId, maximumParticipants } }),
    };
}
