import { type Logger } from '@people-eat/server-domain';
import chalk from 'chalk';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export function createLogger(): Logger.Adapter {
    // import.meta.url

    return {
        debug: (message: any): void => {
            console.log(chalk.magenta(message));
        },
        error: (message: any): void => {
            console.log(chalk.red('Error log:'));
            console.log(message);
        },
        log: (message: any): void => {
            console.log(chalk.blue(message));
        },
        warn: (message: any): void => {
            console.log(chalk.yellow('Warning log:'));
            console.log(chalk.yellow(message));
        },
    };
}
