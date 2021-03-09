import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import fetchPolyfill from 'cross-fetch'; // For IE11

const client = new ApolloClient({
    link: createHttpLink({ uri: 'http://localhost:3000/app-api/graphql', fetch: fetchPolyfill }),
    cache: new InMemoryCache({}),
});

export { client };
