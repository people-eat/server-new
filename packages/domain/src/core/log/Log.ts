import { type LogLevel } from './LogLevel';

export interface Log {
    logId: string;
    logLevel: LogLevel;
    message: string;
    createdAt: Date;
}
