import { type OneTimeAccessToken } from '../../core/one-time-access-token/OneTimeAccessToken';

export interface DBOneTimeAccessToken extends OneTimeAccessToken {
    secret: string;
}
