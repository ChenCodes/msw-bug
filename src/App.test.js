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

test('should render with data', async () => {
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

  expect(await screen.findByLabelText('hello')).toBeInTheDocument();

  expect(await screen.findByLabelText('hello')).toBeInTheDocument();
});
