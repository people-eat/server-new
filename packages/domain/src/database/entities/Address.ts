import type { Address } from '../../core/address/index.js';

export interface DBAddress extends Omit<Address, 'location'> {
    latitude: number;
    longitude: number;
}
