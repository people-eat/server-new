import { IMocks } from '@graphql-tools/mock';
// graphql-scalars also seems to provide mocks

export const mocks: IMocks = {
    UUID: () => 'uuid',
    EmailAddress: () => 'max.mustermann@gmail.com',
    PhoneNumber: () => '+4915256123456',
    Latitude: () => 49.0,
    Longitude: () => 8.0,
    Date: () => '2023-01-01',
    DateTime: () => new Date(),
    UInt: () => 7,
    Url: () => 'https://mockurl.com',
};
