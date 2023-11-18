import { type Authorization, type Cook } from '../..';
import { type Runtime } from '../Runtime';
import { type CookRank, type FindManyRequest, type Location } from '../shared';
import { type CreateOneCookRequest } from './CreateOneCookRequest';
import { createOne } from './useCases/createOne';
import { findMany } from './useCases/findMany';
import { findOne } from './useCases/findOne';
import { getStripeDashboardUrl } from './useCases/getStripeDashboardUrl';
import { getStripeOnboardingUrl } from './useCases/getStripeOnboardingUrl';
import { updateBiography } from './useCases/updateBiography';
import { updateHasStripePayoutMethodActivated } from './useCases/updateHasStripePayoutMethodActivated';
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

    updateHasStripePayoutMethodActivated(context: Authorization.Context, cookId: string): Promise<boolean>;
    getStripeOnboardingUrl(context: Authorization.Context, cookId: string): Promise<string | undefined>;
    getStripeDashboardUrl(context: Authorization.Context, cookId: string): Promise<string | undefined>;
}

export function createCookService(runtime: Runtime): CookService {
    return {
        findMany: (context: Authorization.Context, request: FindManyRequest) => findMany({ runtime, context, request }),
        findOne: (context: Authorization.Context, cookId: string) => findOne({ runtime, context, request: { cookId } }),
        createOne: (context: Authorization.Context, cookId: string, request: CreateOneCookRequest) =>
            createOne({ runtime, context, request: { cookId, ...request } }),
        updateIsLocked: (context: Authorization.Context, cookId: string, isLocked: boolean) =>
            updateIsLocked({ runtime, context, request: { cookId, isLocked } }),
        updateIsVisible: (context: Authorization.Context, cookId: string, isVisible: boolean) =>
            updateIsVisible({ runtime, context, request: { cookId, isVisible } }),
        updateLocation: (context: Authorization.Context, cookId: string, location: Location) =>
            updateLocation({ runtime, context, request: { cookId, location } }),
        updateRank: (context: Authorization.Context, cookId: string, rank: CookRank) =>
            updateRank({ runtime, context, request: { cookId, rank } }),
        updateBiography: (context: Authorization.Context, cookId: string, biography: string) =>
            updateBiography({ runtime, context, request: { cookId, biography } }),
        updateTravelExpenses: (context: Authorization.Context, cookId: string, travelExpenses: number) =>
            updateTravelExpenses({ runtime, context, request: { cookId, travelExpenses } }),
        updateMaximumTravelDistance: (context: Authorization.Context, cookId: string, maximumTravelDistance?: number) =>
            updateMaximumTravelDistance({ runtime, context, request: { cookId, maximumTravelDistance } }),
        updateMinimumPrice: (context: Authorization.Context, cookId: string, minimumPrice?: number) =>
            updateMinimumPrice({ runtime, context, request: { cookId, minimumPrice } }),
        updateMaximumPrice: (context: Authorization.Context, cookId: string, maximumPrice?: number) =>
            updateMaximumPrice({ runtime, context, request: { cookId, maximumPrice } }),
        updateMinimumParticipants: (context: Authorization.Context, cookId: string, minimumParticipants?: number) =>
            updateMinimumParticipants({ runtime, context, request: { cookId, minimumParticipants } }),
        updateMaximumParticipants: (context: Authorization.Context, cookId: string, maximumParticipants?: number) =>
            updateMaximumParticipants({ runtime, context, request: { cookId, maximumParticipants } }),

        updateHasStripePayoutMethodActivated: (context: Authorization.Context, cookId: string) =>
            updateHasStripePayoutMethodActivated({ runtime, context, request: { cookId } }),

        getStripeOnboardingUrl: (context: Authorization.Context, cookId: string) =>
            getStripeOnboardingUrl({ runtime, context, request: { cookId } }),
        getStripeDashboardUrl: (context: Authorization.Context, cookId: string) =>
            getStripeDashboardUrl({ runtime, context, request: { cookId } }),
    };
}
