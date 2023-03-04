import { createDatabaseAdapter } from '@people-eat/server-adapter-database-typeorm';
import { createEmailAdapter } from '@people-eat/server-adapter-email-nodemailer';
import { createEmailRenderer } from '@people-eat/server-adapter-email-renderer';
import { createIdentityProviderAdapter } from '@people-eat/server-adapter-identity-provider';
import { createLogger } from '@people-eat/server-adapter-logger';
import { createPaymentProviderAdapter } from '@people-eat/server-adapter-payment-provider';
import { createSMSAdapter } from '@people-eat/server-adapter-sms-twilio';
import { createServer } from '@people-eat/server-app';
import { createService, Database, Email, IdentityProvider, Logger, Payment, Service, SMS } from '@people-eat/server-domain';
import { EnvironmentVariables } from './EnvironmentVariables.js';
import { getEnvironmentVariables } from './getEnvironmentVariables.js';

const environmentVariables: EnvironmentVariables = getEnvironmentVariables();

const logger: Logger.Adapter = createLogger();

const databaseAdapter: Database.Adapter = await createDatabaseAdapter({
    logger,
    connection: {
        databaseHost: environmentVariables.database.host,
        databasePort: environmentVariables.database.port,
        databaseName: environmentVariables.database.name,
        databaseUser: environmentVariables.database.user,
        databasePassword: environmentVariables.database.password,
    },
});

const emailAdapter: Email.EmailAdapter = createEmailAdapter({
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

const emailRendererAdapter: Email.EmailRendererAdapter = createEmailRenderer({ logger });

const identityProviderAdapter: IdentityProvider.Adapter = createIdentityProviderAdapter({
    logger,
    googleClientId: environmentVariables.identityProvider.googleIosClientId,
    iosBundleIdentifier: environmentVariables.identityProvider.iosBundleIdentifier,
});

const paymentProviderAdapter: Payment.PaymentProviderAdapter = createPaymentProviderAdapter({
    logger,
    stripSecretKey: environmentVariables.payment.stripeSecretKey,
});

const service: Service = createService({
    databaseAdapter,
    logger,
    emailAdapter,
    emailRendererAdapter,
    smsAdapter,
    identityProviderAdapter,
    paymentAdapter: paymentProviderAdapter,
});

await createServer({
    service,
    databaseAdapter,
    logger,
    sessionIdCookieName: 'people-eat-session-id-development',
    options: { port: 4000, enableMocks: false, stripePublishableKey: environmentVariables.payment.stripePublishableKey },
});
