import { render, screen } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { graphql } from 'msw';
import { setupServer } from 'msw/node';
import { client } from './client';

import App from './App';

const handlers = [];

// Setup requests interception using the given handlers.
const server = setupServer(...handlers);

beforeAll(() => {
  // Enable network mocking in tests. Could go in Jest global setup.
  server.listen();
});

afterEach(() => {
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done. Could go in Jest global setup.
  server.close();
});

test('should log companies data', async () => {
  server.use(
      // Intercept the named query for the page and mock the response
      graphql.query('CompaniesQuery', (req, res, ctx) => {
          return res(
              ctx.data({
                  companies: [
                    {
                        node: {
                            id: 'h_123',
                            name: 'Tokyo Office',
                        },
                    },
                    {
                        node: {
                            id: 'h_234',
                            name: 'Berlin Office',
                        },
                    },
                  ],
              }),
          );
      }),
  );

  render(<ApolloProvider client={client}><App /></ApolloProvider>);

  await screen.findByLabelText('hello');
  await screen.findByLabelText('hello');
});


// this test does not log the error, it logs the data from the previous mock
test('should log error message', async () => {
    server.use(
        // Intercept the named query for the page and mock the response
        graphql.query('CompaniesQuery', (req, res, ctx) => {
            return res(
                ctx.errors([
                    {
                        message: 'Error message',
                        stack: null,
                    },
                ]),
            );
        }),
    );
  
    render(<ApolloProvider client={client}><App /></ApolloProvider>);
  
    await screen.findByLabelText('hello');
    await screen.findByLabelText('hello');
  });
