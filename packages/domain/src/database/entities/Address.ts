import type { Address } from '../../core/address';

export interface DBAddress extends Omit<Address, 'location'> {
    latitude: number;
    longitude: number;
}
