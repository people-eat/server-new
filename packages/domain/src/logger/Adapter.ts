// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LogFunction = (message: any) => void;

export interface Adapter {
    log: LogFunction;
    debug: LogFunction;
    warn: LogFunction;
    error: LogFunction;
}
