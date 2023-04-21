import { customAlphabet } from 'nanoid';
import { type NanoId } from '../core/shared';

export function createNanoId(): NanoId {
    const nanoIdGenerator: () => string = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);
    return nanoIdGenerator();
}
