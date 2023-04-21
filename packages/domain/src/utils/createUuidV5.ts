import { v5 } from 'uuid';

export function createUuidV5(value: string): string {
    return v5(value, value);
}
