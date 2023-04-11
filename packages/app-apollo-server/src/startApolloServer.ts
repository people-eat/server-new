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
import { createCategoryResolvers } from './category/createCategoryResolvers';
import { type GQLResolvers } from './generated';
import { createLanguageResolvers } from './language/createLanguageResolvers';

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
        },
        Mutation: {
            languages: () => ({} as any),
            categories: () => ({} as any),
        },
        ...createLanguageResolvers(service),
        ...createCategoryResolvers(service),
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
