// @flow strict
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// $FlowFixMe utilities are not typed
import { relayStylePagination } from '@apollo/client/utilities';
import fetchPolyfill from 'cross-fetch'; // For IE11

const client = new ApolloClient({
    link: createHttpLink({ uri: '/app-api/graphql', fetch: fetchPolyfill }),
    cache: new InMemoryCache({}),
});

export { client };
