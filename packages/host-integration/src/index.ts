import { createDataSourceAdapter } from '@people-eat/server-adapter-data-source-typeorm';
import { createEmailAdapter } from '@people-eat/server-adapter-email-nodemailer';
import { createLogger } from '@people-eat/server-adapter-logger';
import { createSMSAdapter } from '@people-eat/server-adapter-sms-twilio';
import { startApolloServerApp } from '@people-eat/server-app-apollo-server';
import {
    createService,
    type DataSource,
    type Email,
    type IdentityProvider,
    type Logger,
    type PaymentProvider,
    type Service,
    type SMS,
} from '@people-eat/server-domain';
import { type EnvironmentVariables } from './EnvironmentVariables.js';
import { getEnvironmentVariables } from './getEnvironmentVariables.js';

const environmentVariables: EnvironmentVariables = getEnvironmentVariables();

const logger: Logger.Adapter = createLogger();

async function bootstrap(): Promise<void> {
    const dataSourceAdapter: DataSource.Adapter = await createDataSourceAdapter({
        connection: {
            databaseHost: environmentVariables.database.host,
            databaseName: environmentVariables.database.name,
            databasePassword: environmentVariables.database.password,
            databasePort: environmentVariables.database.port,
            databaseUser: environmentVariables.database.user,
        },
        logger,
        reset: true,
    });

    const emailAdapter: Email.Adapter = createEmailAdapter({
        logger,
        emailAddress: environmentVariables.email.emailAddress,
        password: environmentVariables.email.password,
    });

    const smsAdapter: SMS.Adapter = createSMSAdapter({
        logger,
        accountSid: environmentVariables.sms.twilioAccountSid,
        authToken: environmentVariables.sms.twilioAuthToken,
        twilioPhoneNumber: environmentVariables.sms.twilioPhoneNumber,
    });

    const identityProviderAdapter: IdentityProvider.Adapter = {
        ['APPLE']: async (_idToken: string) => undefined,
        ['GOOGLE']: async (_idToken: string) => undefined,
    };

    const paymentAdapter: PaymentProvider.Adapter = {
        ['STRIPE']: async () => undefined,
    };

    const service: Service = createService({
        dataSourceAdapter,
        logger,
        emailAdapter,
        smsAdapter,
        identityProviderAdapter,
        paymentAdapter,
        serverUrl: 'https://api-integration.people-eat.com',
        webAppUrl: 'https://integration.people-eat.com',
    });

    const { path } = await startApolloServerApp({
        dataSourceAdapter,
        logger,
        mockSchema: false,
        port: 4000,
        sessionIdCookie: {
            name: 'integration-people-eat-session-id',
            domainScope: '.people-eat.com',
            secure: true,
        },
        service,
    });

    logger.log(`🚀 Apollo server started at ${path}`);
}

bootstrap()
    .then()
    .catch((error: Error) => logger.error(error));
