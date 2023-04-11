import { ApolloServer, type ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware, type ExpressContextFunctionArgument } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { loadFilesSync } from '@graphql-tools/load-files';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { Authorization, type DataSource, type Logger, type Service } from '@people-eat/server-domain';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import { type GraphQLSchema } from 'graphql';
import {
    DateResolver,
    DateTimeResolver,
    EmailAddressResolver,
    LatitudeResolver,
    LongitudeResolver,
    PhoneNumberResolver,
    UnsignedIntResolver,
    URLResolver,
    UUIDResolver,
} from 'graphql-scalars';
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload-minimal';
import { type Disposable } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer as createHttpServer, type IncomingMessage, type Server as HttpServer } from 'http';
import { WebSocketServer } from 'ws';
import { createAdminResolvers } from './admin/createAdminResolvers';
import { createAllergyResolvers } from './allergy/createAllergyResolvers';
import { createAnonymousSessionResolvers } from './anonymous-session/createAnonymousSessionResolvers';
import { createAnonymousUserResolvers } from './anonymous-user/createAnonymousUserResolvers';
import { createCategoryResolvers } from './category/createCategoryResolvers';
import { createCookSpecificFeeResolvers } from './cook-specific-fee/createCookSpecificFeeResolvers';
import { createCookResolvers } from './cook/createCookResolvers';
import { createCourseResolvers } from './course/createCourseResolvers';
import { createCustomerFeeUpdateResolvers } from './customer-fee-update/createCustomerFeeUpdateResolvers';
import { createEmailAddressUpdateResolvers } from './email-address-update/createEmailAddressUpdateResolvers';
import { type GQLResolvers } from './generated';
import { createKitchenResolvers } from './kitchen/createKitchenResolvers';
import { createLanguageResolvers } from './language/createLanguageResolvers';
import { createMealResolvers } from './meal/createMealResolvers';
import { createMenuResolvers } from './menu/createMenuResolvers';
import { createNotificationConfigurationResolvers } from './notification-configuration/createNotificationConfigurationResolvers';
import { createNotificationResolvers } from './notification/createNotificationResolvers';
import { createPhoneNumberUpdateResolvers } from './phone-number-update/createPhoneNumberUpdateResolvers';
import { createPrivacyPolicyUpdateResolvers } from './privacy-policy-update/createPrivacyPolicyUpdateResolvers';
import { createPublicCookResolvers } from './public-cook/createPublicCookResolvers';
import { createPublicPrivacyPolicyUpdateResolvers } from './public-privacy-policy-update/createPublicPrivacyPolicyUpdateResolvers';
import { createPublicTermsUpdateResolvers } from './public-terms-update/createPublicTermsUpdateResolvers';
import { createPublicUserResolvers } from './public-user/createPublicUserResolvers';
import { createSessionResolvers } from './session/createSessionResolvers';
import { createTermsUpdateResolvers } from './terms-update/createTermsUpdateResolvers';
import { createUserResolvers } from './user/createUserResolvers';

export interface StartApolloServerAppOptions {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    service: Service;
    mockSchema: boolean;
    port: number;
    sessionIdCookie: { name: string; domainScope: string; secure: boolean };
}

export interface StartApolloServerAppResult {
    path: string;
}

// eslint-disable-next-line max-statements
export async function startApolloServerApp({
    dataSourceAdapter,
    logger,
    mockSchema,
    port,
    sessionIdCookie,
    service,
}: StartApolloServerAppOptions): Promise<StartApolloServerAppResult> {
    const typeDefs: string[] = loadFilesSync('./**/*.graphql');

    const resolvers: GQLResolvers = {
        Date: DateResolver,
        DateTime: DateTimeResolver,
        EmailAddress: EmailAddressResolver,
        Latitude: LatitudeResolver,
        Longitude: LongitudeResolver,
        PhoneNumber: PhoneNumberResolver,
        UInt: UnsignedIntResolver,
        UUID: UUIDResolver,
        Url: URLResolver,
        Upload: GraphQLUpload,
        Query: {
            languages: () => ({} as any),
            categories: () => ({} as any),
            kitchens: () => ({} as any),
            allergies: () => ({} as any),
            users: () => ({} as any),
            cooks: () => ({} as any),
            publicCooks: () => ({} as any),
            publicTermsUpdates: () => ({} as any),
            publicPrivacyPolicyUpdates: () => ({} as any),
        },
        Mutation: {
            languages: () => ({} as any),
            categories: () => ({} as any),
            kitchens: () => ({} as any),
            allergies: () => ({} as any),
            users: () => ({} as any),
            sessions: () => ({} as any),
            cooks: () => ({} as any),
        },
        ...createLanguageResolvers(service),
        ...createCategoryResolvers(service),
        ...createKitchenResolvers(service),
        ...createAllergyResolvers(service),
        ...createUserResolvers(service),
        ...createPublicUserResolvers(),
        ...createAnonymousUserResolvers(),
        ...createSessionResolvers(service),
        ...createAnonymousSessionResolvers(),
        ...createAdminResolvers(service),
        ...createCookResolvers(service),
        ...createPublicCookResolvers(service),
        ...createNotificationResolvers(),
        ...createNotificationConfigurationResolvers(),
        ...createTermsUpdateResolvers(),
        ...createPublicTermsUpdateResolvers(service),
        ...createPrivacyPolicyUpdateResolvers(),
        ...createPublicPrivacyPolicyUpdateResolvers(service),
        ...createCustomerFeeUpdateResolvers(),
        ...createCookSpecificFeeResolvers(),
        ...createPhoneNumberUpdateResolvers(service),
        ...createEmailAddressUpdateResolvers(service),
        ...createMealResolvers(service),
        ...createMenuResolvers(service),
        ...createCourseResolvers(service),
    };

    const path: string = '/graphql';

    let schema: GraphQLSchema = makeExecutableSchema({ resolvers, typeDefs });

    if (mockSchema) schema = addMocksToSchema({ schema });

    const expressApp: Express = express();
    const httpServer: HttpServer = createHttpServer(expressApp);
    const webSocketServer: WebSocketServer = new WebSocketServer({ server: httpServer });

    webSocketServer.on('headers', (_headers: string[], request: IncomingMessage & { sessionId?: string }) => {
        if (!request.headers.cookie) throw new Error('Websocket connection without session id was declined');

        request.sessionId = request.headers.cookie
            .split(';')
            .reduce((cookieMap: Map<string, string>, cookie: string) => {
                const [key, value] = cookie.trim().split('=');
                if (!key || !value) throw new Error('Invalid sessionId header');
                return cookieMap.set(key, value);
            }, new Map<string, string>())
            .get(sessionIdCookie.name);
    });

    const serverCleanup: Disposable = useServer(
        {
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
            schema,
        },
        webSocketServer,
    );

    const plugins: ApolloServerPlugin[] = [
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                  embed: {
                      displayOptions: { docsPanelState: 'open', showHeadersAndEnvVars: true, theme: 'light' },
                      persistExplorerState: true,
                  },
                  graphRef: 'people-eat@current',
              })
            : ApolloServerPluginLandingPageLocalDefault({ embed: true, includeCookies: true }),

        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart(): Promise<{ drainServer: () => Promise<void> }> {
                return {
                    async drainServer(): Promise<void> {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ];

    const server: ApolloServer = new ApolloServer({ plugins, schema });

    await server.start();

    expressApp.use(
        path,
        cors<cors.CorsRequest>({ origin: true, credentials: true }),
        bodyParser.json(),
        cookieParser(),
        graphqlUploadExpress({ maxFileSize: undefined, maxFiles: 10 }),
        expressMiddleware(server, {
            context: async ({ req, res }: ExpressContextFunctionArgument): Promise<Authorization.Context> => {
                const sessionId: string | undefined = req.cookies[sessionIdCookie.name];
                const result: Authorization.AuthorizeSessionOutput | undefined = await Authorization.authorizeSession({
                    dataSourceAdapter,
                    logger,
                    sessionId,
                });
                if (!result) throw new Error();

                res.cookie(sessionIdCookie.name, result.sessionId, {
                    expires: result.expirationDate,
                    httpOnly: true,
                    sameSite: sessionIdCookie.secure ? 'none' : 'lax',
                    secure: sessionIdCookie.secure,
                    domain: sessionIdCookie.domainScope,
                });

                return {
                    ...req,
                    sessionId: result.sessionId,
                    userId: result.userId,
                };
            },
        }),
    );

    httpServer.listen(port, () => undefined);

    return { path: `http://localhost:${port}${path}` };
}
