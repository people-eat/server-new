import { type Authorization } from '../../..';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type LocationSuggestion } from '../LocationSuggestion';

export interface FindLocationSuggestionsInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: { searchText: string };
}

interface GoogleMapsPlacesResult {
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

export async function find({ runtime: { logger }, request: { searchText } }: FindLocationSuggestionsInput): Promise<LocationSuggestion[]> {
    if (searchText === '') return [];

    try {
        const { results }: { results: GoogleMapsPlacesResult[] } = await fetch(
            encodeURI(
                'https://maps.googleapis.com/maps/api/place/textsearch/json?language=de&type=address&query="' +
                    searchText +
                    '"&key=' +
                    'AIzaSyCMfp2U9V3WfEbqd9u1UR0qgfk-1uVIit8',
            ),
        ).then((response: Response) => response.json());

        return results.map(({ formatted_address, geometry }: GoogleMapsPlacesResult) => ({
            id: createNanoId(),
            title: formatted_address,
            latitude: geometry.location.lat,
            longitude: geometry.location.lng,
        }));
    } catch (error) {
        logger.error(error);
        return [];
    }
}
