import type { OneTimeAccessToken } from '../../core/one-time-access-token/OneTimeAccessToken.js';

export interface DBOneTimeAccessToken extends OneTimeAccessToken {
    secret: string;
}
