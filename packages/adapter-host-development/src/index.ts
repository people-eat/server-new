import { createDatabaseAdapter } from '@people-eat/server-adapter-database-typeorm';
import { createEmailAdapter } from '@people-eat/server-adapter-email-nodemailer';
import { createEmailRenderer } from '@people-eat/server-adapter-email-renderer';
import { createIdentityProviderAdapter } from '@people-eat/server-adapter-identity-provider';
import { createLogger } from '@people-eat/server-adapter-logger';
import { createPaymentProviderAdapter } from '@people-eat/server-adapter-payment-provider';
import { createSMSAdapter } from '@people-eat/server-adapter-sms-twilio';
import { createServer } from '@people-eat/server-app';
import { Database, Email, IdentityProvider, Logger, Payment, SMS } from '@people-eat/server-domain';

const logger: Logger.Adapter = createLogger();

const databaseAdapter: Database.Adapter = await createDatabaseAdapter({
    logger,
    connection: {
        databaseHost: 'localhost',
        databasePort: 3306,
        databaseName: 'PeopleEatDB',
        databaseUser: 'people-eat-server',
        databasePassword: 'password',
    },
});

const emailAdapter: Email.EmailAdapter = createEmailAdapter({
    logger,
    emailAddress: 'confirmation.peopleeat@gmail.com',
    password: 'lgpvaulmignmtvst',
});

const smsAdapter: SMS.Adapter = createSMSAdapter({
    logger,
    accountSid: 'ACb82a7501684647bac04fe7e07ddf7c4b',
    authToken: '0bb133cbdc6afd919a2112f06fc85a3e',
    twilioPhoneNumber: '+19378216184',
});

const emailRendererAdapter: Email.EmailRendererAdapter = createEmailRenderer({ logger });

const identityProviderAdapter: IdentityProvider.IdentityProviderAdapter = createIdentityProviderAdapter({
    logger,
    googleClientId: '637398101069-3mjhfr8m5a1apim7ti1junf0usi42fel.apps.googleusercontent.com',
    appleBundleIdentifier: 'people-eat.ios-app',
});

const paymentProviderAdapter: Payment.PaymentProviderAdapter = createPaymentProviderAdapter({
    logger,
    stripeApiKey: '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',
});

await createServer({
    databaseAdapter,
    logger,
    emailAdapter,
    emailRendererAdapter,
    smsAdapter,
    identityProviderAdapter,
    paymentProviderAdapter,
    // people-eat-session-id-<environment>
    sessionIdCookieName: 'people-eat-session-id-development',
});
