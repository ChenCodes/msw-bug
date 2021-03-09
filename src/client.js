// @flow strict
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// $FlowFixMe utilities are not typed
import { relayStylePagination } from '@apollo/client/utilities';
import fetchPolyfill from 'cross-fetch'; // For IE11

const client = new ApolloClient({
<<<<<<< HEAD
    link: createHttpLink({ uri: 'http://localhost:3000/app-api/graphql', fetch: fetchPolyfill }),
=======
    link: createHttpLink({ uri: 'https://localhost:3000/app-api/graphql', fetch: fetchPolyfill }),
>>>>>>> fa37f45... create repro case
    cache: new InMemoryCache({}),
});

export { client };
