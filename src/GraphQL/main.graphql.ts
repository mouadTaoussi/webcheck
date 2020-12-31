import { buildSchema } from 'type-graphql';
// import { } from './Authentication/resolvers.graphql';
import { websiteResolver } from './Check/resolvers.graphql';
import { ApolloServer } from 'apollo-server-express';


async function runapolloserver(): Promise<void> {

	const ServerOfApollo: any = new ApolloServer({
		schema: await buildSchema({
			resolvers : [ websiteResolver ]
		}),
		// context: '',
		playground : true
	})
}

runapolloserver();
