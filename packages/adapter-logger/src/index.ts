/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Logger } from '@people-eat/server-domain';
import chalk from 'chalk';

export function createLogger(): Logger.Adapter {
    // import.meta.url

    return {
        log: (message: any): void => {
            console.log(chalk.blue(message));
        },
        debug: (message: any): void => {
            console.log(chalk.magenta(message));
        },
        warn: (message: any): void => {
            console.log(chalk.yellow('Warning log:'));
            console.log(chalk.yellow(message));
        },
        error: (message: any): void => {
            console.log(chalk.red('Error log:'));
            console.log(message);
        },
    };
}
