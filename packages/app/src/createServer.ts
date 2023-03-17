import { ApolloServer, GraphQLServerListener } from '@apollo/server';
import { ExpressContextFunctionArgument, expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Authorization, Database, Logger, Service } from '@people-eat/server-domain';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, { CorsRequest } from 'cors';
import express, { Express } from 'express';
import { readFileSync } from 'fs';
import { GraphQLError, GraphQLSchema } from 'graphql';
import {
    EmailAddressResolver,
    LatitudeResolver,
    LongitudeResolver,
    PhoneNumberResolver,
    UnsignedIntResolver,
    URLResolver,
    UUIDResolver,
} from 'graphql-scalars';
import { mocks } from './mocks.js';
// import { PubSub } from 'graphql-subscriptions';
import { Disposable } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer as createHttpServer, IncomingMessage, Server } from 'http';
import { resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import { createAddressResolvers } from './address/createAddressResolvers.js';
import { createAllergyResolvers } from './allergy/createCategoryResolvers.js';
import { createCategoryResolvers } from './category/createCategoryResolvers.js';
import { createCookResolvers } from './cook/createCookResolvers.js';
import { createEmailAddressUpdateResolvers } from './email-address-update/createEmailAddressUpdateResolvers.js';
import { GQLResolvers } from './generated.js';
import { createKitchenResolvers } from './kitchen/createKitchenResolvers.js';
import { createLanguageResolvers } from './language/createLanguageResolvers.js';
import { createMealResolvers } from './meal/createMealResolvers.js';
import { createMenuResolvers } from './menu/createMenuResolvers.js';
import { createNotificationConfigurationResolvers } from './notification-configuration/createNotificationConfigurationResolvers.js';
import { createNotificationResolvers } from './notification/createNotificationResolvers.js';
import { createOneTimeAccessTokenResolvers } from './one-time-access-token/createOneTimeAccessTokenResolvers.js';
import { createPhoneNumberUpdateResolvers } from './phone-number-update/createPhoneNumberUpdateResolvers.js';
import { createPublicCookResolvers } from './public-cook/createPublicCookResolvers.js';
import { createSessionResolvers } from './session/createSessionResolvers.js';
import { createUserResolvers } from './user/createUserResolvers.js';

export interface CreateServerInput {
    service: Service;
    databaseAdapter: Database.Adapter;
    logger: Logger.Adapter;
    sessionIdCookieName: string;
    options: {
        port: number;
        enableMocks: boolean;
        stripePublishableKey: string;
    };
}

export async function createServer({
    service,
    databaseAdapter,
    logger,
    sessionIdCookieName,
    options: { port, enableMocks, stripePublishableKey },
}: CreateServerInput): Promise<void> {
    const __filename: string = fileURLToPath(import.meta.url);

    const resolvers: GQLResolvers<Authorization.Context> = {
        UUID: UUIDResolver,
        EmailAddress: EmailAddressResolver,
        PhoneNumber: PhoneNumberResolver,
        Latitude: LatitudeResolver,
        Longitude: LongitudeResolver,
        UInt: UnsignedIntResolver,
        Url: URLResolver,
        Query: {
            admins: () => ({} as any),
            allergies: () => ({} as any),
            categories: () => ({} as any),
            cooks: () => ({} as any),
            kitchens: () => ({} as any),
            languages: () => ({} as any),
            payments: () => ({ stripe: { publishableKey: stripePublishableKey } }),
            privacyPolicyUpdates: () => ({} as any),
            publicCooks: () => ({} as any),
            publicMenus: () => ({} as any),
            publicPrivacyPolicyUpdates: () => ({} as any),
            publicTermsUpdates: () => ({} as any),
            status: () => ({ latestIosVersion: '1.0.0' }),
            termsUpdates: () => ({} as any),
            users: () => ({} as any),
        },
        Mutation: {
            admins: () => ({} as any),
            allergies: () => ({} as any),
            categories: () => ({} as any),
            cooks: () => ({} as any),
            kitchens: () => ({} as any),
            languages: () => ({} as any),
            privacyPolicyUpdates: () => ({} as any),
            sessions: () => ({} as any),
            termsUpdates: () => ({} as any),
            users: () => ({} as any),
        },
        ...createUserResolvers(service),
        ...createSessionResolvers(service),
        ...createEmailAddressUpdateResolvers(service),
        ...createPhoneNumberUpdateResolvers(service),
        ...createOneTimeAccessTokenResolvers(service),
        ...createAddressResolvers(service),
        ...createNotificationResolvers(service),
        ...createNotificationConfigurationResolvers(service),
        ...createCookResolvers(service),
        ...createPublicCookResolvers(service),
        ...createMenuResolvers(service),
        ...createMealResolvers(service),
        ...createKitchenResolvers(service),
        ...createLanguageResolvers(service),
        ...createCategoryResolvers(service),
        ...createAllergyResolvers(service),
    };

    const schema: GraphQLSchema = makeExecutableSchema({
        typeDefs: [
            readFileSync(pathResolve(__filename, '../../src/schema.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/user/user.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/session/session.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/email-address-update/email-address-update.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/phone-number-update/phone-number-update.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/one-time-access-token/one-time-access-token.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/address/address.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/notification/notification.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/notification-configuration/notification-configuration.graphql'), {
                encoding: 'utf-8',
            }),
            readFileSync(pathResolve(__filename, '../../src/cook/cook.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/public-cook/public-cook.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/public-menu/public-menu.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/meal/meal.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/menu/menu.graphql'), { encoding: 'utf-8' }),

            readFileSync(pathResolve(__filename, '../../src/language/language.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/kitchen/kitchen.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/category/category.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/allergy/allergy.graphql'), { encoding: 'utf-8' }),

            readFileSync(pathResolve(__filename, '../../src/admin/admin.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/terms-update/terms-update.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/public-terms-update/public-terms-update.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/privacy-policy-update/privacy-policy-update.graphql'), { encoding: 'utf-8' }),
            readFileSync(pathResolve(__filename, '../../src/public-privacy-policy-update/public-privacy-policy-update.graphql'), {
                encoding: 'utf-8',
            }),
            readFileSync(pathResolve(__filename, '../../src/favorite-cook/favorite-cook.graphql'), {
                encoding: 'utf-8',
            }),
        ],
        resolvers,
    });

    const app: Express = express();
    const httpServer: Server = createHttpServer(app);

    const wsServer: WebSocketServer = new WebSocketServer({ server: httpServer, path: '/graphql' });

    wsServer.on('headers', (_headers: string[], request: IncomingMessage & { sessionId?: string }) => {
        if (!request.headers.cookie) throw new Error('Websocket connection without session id was declined');

        request.sessionId = request.headers.cookie
            .split(';')
            .reduce((cookieMap: Map<string, string>, cookie: string) => {
                const [key, value] = cookie.trim().split('=');
                return cookieMap.set(key, value);
            }, new Map<string, string>())
            .get(sessionIdCookieName);
    });

    const serverCleanup: Disposable = useServer(
        {
            schema: enableMocks ? addMocksToSchema({ schema, mocks }) : schema,
            context: (
                context: Authorization.Context & { extra: { request: IncomingMessage & { sessionId?: string } } },
            ): Authorization.Context => {
                const sessionId: string | undefined = context.extra.request.sessionId;
                if (!sessionId) throw new Error('Subscription requested without session id');

                return {
                    sessionId: sessionId,
                    userId: undefined,
                };
            },
        },
        wsServer,
    );

    // const pubSub: PubSub = new PubSub();

    const server: ApolloServer<Authorization.Context> = new ApolloServer<Authorization.Context>({
        schema: enableMocks ? addMocksToSchema({ schema, mocks }) : schema,
        introspection: true,
        includeStacktraceInErrorResponses: false,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),
            // Proper shutdown for the WebSocket server.
            {
                serverWillStart: async (): Promise<GraphQLServerListener> => ({
                    drainServer: async (): Promise<void> => {
                        await serverCleanup.dispose();
                    },
                }),
            },
            ApolloServerPluginLandingPageLocalDefault({
                embed: true,
                includeCookies: true,
                document: '',
                variables: {},
                headers: {},
                footer: false,
            }),
        ],
        formatError: (error: GraphQLError): GraphQLError => {
            logger.error(error);
            if (error.extensions?.validationErrorCode === 'INTROSPECTION_DISABLED') return { message: error.message } as GraphQLError;
            return error;
        },
    });

    await server.start();

    app.use(
        '/graphql',
        cors<CorsRequest>({
            origin: true,
            credentials: true,
        }),
        bodyParser.json(),
        cookieParser(),
        expressMiddleware(server, {
            context: async ({ req, res }: ExpressContextFunctionArgument): Promise<Authorization.Context> => {
                const sessionId: string | undefined = req.cookies[sessionIdCookieName];
                const result: Authorization.AuthorizeSessionOutput | undefined = await Authorization.authorizeSession({
                    databaseAdapter,
                    logger,
                    sessionId,
                });

                if (!result) throw new Error();

                res.cookie(sessionIdCookieName, result.sessionId, {
                    httpOnly: true,
                    expires: result.expirationDate,
                    secure: false,
                    sameSite: 'none',
                });

                return {
                    sessionId: result.sessionId,
                    userId: result.userId,
                };
            },
        }),
    );

    await new Promise((resolve: any): any => httpServer.listen({ port }, resolve));
    logger.log(`🚀 Apollo server started at http://localhost:${port}/graphql`);
}
