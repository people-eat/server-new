import { type Authorization, type DataSource, type Logger } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneSearchRequestRequest } from '../CreateOneSearchRequestRequest';

export interface CreateOneSearchRequestInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneSearchRequestRequest;
}

export async function createOne({ dataSourceAdapter, request }: CreateOneSearchRequestInput): Promise<boolean> {
    const { adults, children, locationText, date, origin } = request;

    const searchRequestId: NanoId = createNanoId();

    const success: boolean = await dataSourceAdapter.searchRequestRepository.insertOne({
        searchRequestId,
        adults,
        children,
        locationText,
        date,
        origin,
        createdAt: new Date(),
    });

    return success;
}
