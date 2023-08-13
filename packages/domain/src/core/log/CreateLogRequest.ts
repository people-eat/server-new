import { type LogLevel } from './LogLevel';

export interface CreateLogRequest {
    logLevel: LogLevel;
    message: string;
}
