import { customAlphabet } from 'nanoid';

export default function createNanoId(): string {
    const nanoIdGenerator: () => string = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);
    return nanoIdGenerator();
}
