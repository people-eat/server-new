import { ApolloServer, type ApolloServerPlugin } from '@apollo/server';
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
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

    const plugins: ApolloServerPlugin[] =
        process.env.NODE_ENV === 'production'
            ? [
                  ApolloServerPluginLandingPageProductionDefault({
                      embed: {
                          displayOptions: { docsPanelState: 'open', showHeadersAndEnvVars: true, theme: 'light' },
                          persistExplorerState: true,
                      },
                      graphRef: 'people-eat@current',
                  }),
              ]
            : [ApolloServerPluginLandingPageLocalDefault({ embed: true })];

    const schema: GraphQLSchema = makeExecutableSchema({ resolvers, typeDefs });

    const server: ApolloServer = new ApolloServer(mockSchema ? { plugins, schema: addMocksToSchema({ schema }) } : { plugins, schema });

    const path: string = 'graphql';

    const { url } = await startStandaloneServer(server, { listen: { path, port } });

    return { path: url + path };
}
