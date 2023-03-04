import type { User } from '../../core/user/User.js';

export interface DBUser extends User {
    isLocked: boolean;
    password?: string;
    failedSignInAttempts: number;
}
