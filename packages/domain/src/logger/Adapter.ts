import { type Service } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogFunction = (message: any) => void;

export interface Adapter {
    setService: (service: Service) => void;
    info: LogFunction;
    debug: LogFunction;
    warn: LogFunction;
    error: LogFunction;
}
