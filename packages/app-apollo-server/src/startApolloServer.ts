import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { type GraphQLSchema } from 'graphql';
import { type GQLResolvers } from './generated';

export interface StartApolloServerAppOptions {
    port: number;
}

export interface StartApolloServerAppResult {
    path: string;
}

export async function startApolloServerApp({ port }: StartApolloServerAppOptions): Promise<StartApolloServerAppResult> {
    const typeDefs: string[] = loadFilesSync('./**/*.graphql');

    const resolvers: GQLResolvers = {
        Query: {},
        Mutation: {},
    };

    const schema: GraphQLSchema = makeExecutableSchema({ resolvers, typeDefs });

    const server: ApolloServer = new ApolloServer({ schema });

    const path: string = 'graphql';

    const { url } = await startStandaloneServer(server, { listen: { path, port } });

    return { path: url + path };
}
