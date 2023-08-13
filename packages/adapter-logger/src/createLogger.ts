import { type Logger, type Service } from '@people-eat/server-domain';
import chalk from 'chalk';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export function createLogger(): Logger.Adapter {
    // import.meta.url

    let service: Service | undefined = undefined;

    return {
        setService: (inputService: Service): void => {
            service = inputService;
        },
        debug: (message: any): void => {
            console.log(chalk.magenta(message));

            if (service) {
                service.log
                    .createOne({
                        logLevel: 'DEBUG',
                        message: JSON.stringify(message),
                    })
                    .then()
                    .catch((error: Error) => console.log(error));
            }
        },
        error: (message: any): void => {
            console.log(chalk.red('Error log:'));
            console.log(message);

            if (service) {
                service.log
                    .createOne({
                        logLevel: 'ERROR',
                        message: JSON.stringify(message),
                    })
                    .then()
                    .catch((error: Error) => console.log(error));
            }
        },
        info: (message: any): void => {
            console.log(chalk.blue(message));

            if (service) {
                service.log
                    .createOne({
                        logLevel: 'INFO',
                        message: JSON.stringify(message),
                    })
                    .then()
                    .catch((error: Error) => console.log(error));
            }
        },
        warn: (message: any): void => {
            console.log(chalk.yellow('Warning log:'));
            console.log(chalk.yellow(message));

            if (service) {
                service.log
                    .createOne({
                        logLevel: 'WARN',
                        message: JSON.stringify(message),
                    })
                    .then()
                    .catch((error: Error) => console.log(error));
            }
        },
    };
}
