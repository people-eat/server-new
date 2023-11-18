import { type Cook } from '../../core/cook/Cook';

export interface DBCook extends Omit<Cook, 'location' | 'hasStripePayoutMethodActivated'> {
    latitude: number;
    longitude: number;
}
