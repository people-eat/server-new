import { v5 } from 'uuid';

export default function createUuidV5(value: string): string {
    return v5(value, value);
}
