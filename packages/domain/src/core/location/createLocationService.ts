import { type Authorization } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type LocationSuggestion } from './LocationSuggestion';
import { find } from './useCases/find';

export interface LocationService {
    find(context: Authorization.Context, request: { searchText: string }): Promise<LocationSuggestion[]>;
}

export function createLocationService(runtime: Runtime): LocationService {
    return {
        find: (context: Authorization.Context, request: { searchText: NanoId }) => find({ runtime, context, request }),
    };
}
