import { type Location } from './shared';

export default function packLocation<T extends { latitude: number; longitude: number; locationText?: string }>({
    latitude,
    longitude,
    locationText,
    ...rest
}: T): Omit<T, 'latitude' | 'longitude' | 'locationText'> & { location: Location } {
    return {
        ...rest,
        location: {
            latitude,
            longitude,
            text: locationText,
        },
    };
}
