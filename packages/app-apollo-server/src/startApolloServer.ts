import { ApolloServer, type ApolloServerPlugin } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { loadFilesSync } from '@graphql-tools/load-files';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bodyParser from 'body-parser';
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
import { type Disposable } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer as createHttpServer, type Server as HttpServer } from 'http';
import { WebSocketServer } from 'ws';
import { type GQLResolvers } from './generated';

export interface StartApolloServerAppOptions {
    mockSchema: boolean;
    port: number;
}

export interface StartApolloServerAppResult {
    path: string;
}

export async function startApolloServerApp({ mockSchema, port }: StartApolloServerAppOptions): Promise<StartApolloServerAppResult> {
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
        Query: {},
        Mutation: {},
    };

    const path: string = '/graphql';

    let schema: GraphQLSchema = makeExecutableSchema({ resolvers, typeDefs });

    if (mockSchema) schema = addMocksToSchema({ schema });

    const expressApp: Express = express();
    const httpServer: HttpServer = createHttpServer(expressApp);
    const webSocketServer: WebSocketServer = new WebSocketServer({ path, server: httpServer });
    const serverCleanup: Disposable = useServer({ schema }, webSocketServer);

    const plugins: ApolloServerPlugin[] = [
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault({
                  embed: {
                      displayOptions: { docsPanelState: 'open', showHeadersAndEnvVars: true, theme: 'light' },
                      persistExplorerState: true,
                  },
                  graphRef: 'people-eat@current',
              })
            : ApolloServerPluginLandingPageLocalDefault({ embed: true }),

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

    expressApp.use(path, cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server));

    httpServer.listen(port, () => undefined);

    return { path: `http://localhost:${port}${path}` };
}
