import { Location } from './shared.js';

export default function packLocation<T extends { latitude: number; longitude: number }>({
    latitude,
    longitude,
    ...rest
}: T): Omit<T, 'latitude' | 'longitude'> & { location: Location } {
    return {
        ...rest,
        location: {
            latitude,
            longitude,
        },
    };
}
