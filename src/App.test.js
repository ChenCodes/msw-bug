import { render, screen } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import { graphql } from "msw";
import { setupServer } from "msw/node";
import { client } from "./client";

import App from "./App";

const handlers = [];
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
  // console.warn('beforeAll, server.listen()');
});

afterEach(() => {
  server.resetHandlers();
  // console.warn('afterEach, server.resetHandlers()')
});

afterAll(() => {
  server.close();
  // console.warn('afterAll, server.close()')
});

test("should render with data (passes)", async () => {
  server.use(
    graphql.query("CompaniesQuery", (req, res, ctx) => {
      return res(
        ctx.data({
          companies: [
            {
              node: {
                id: "h_123",
                name: "New York Office",
              },
            },
          ],
        })
      );
    })
  );

  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  const dataElement = await screen.findByTestId("data");
  expect(dataElement).toBeInTheDocument();
  expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  const data = JSON.parse(dataElement.textContent);
  expect(data).toMatchObject({
    companies: [{ node: { id: "h_123", name: "New York Office" } }],
  });
  expect(dataElement).toMatchInlineSnapshot(`
    <div
      data-testid="data"
    >
      {"companies":[{"node":{"id":"h_123","name":"New York Office"}}]}
    </div>
  `);
});

test("should render with different data (fails)", async () => {
  expect(document.body).toBeEmptyDOMElement(); // comfirm DOM state is cleared between tests

  server.use(
    graphql.query("CompaniesQuery", (req, res, ctx) => {
      return res(
        ctx.data({
          companies: [
            {
              node: {
                id: "h_789",
                name: "Paris Office",
              },
            },
          ],
        })
      );
    })
  );

  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

  const dataElement = await screen.findByTestId("data");

  expect(dataElement).toBeInTheDocument();
  expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  const data = JSON.parse(dataElement.textContent);

  /**
   * Failure case that reprduces the bug:
   */

  console.warn(`
    We are rendering the same component as in the first test but want to
    show different data by changing the msw GraphQL mock implementation.
    But we get the same data as in the first test. The next assertion fails.
  `)

  expect(data).toMatchObject({
    companies: [{ node: { id: "h_789", name: "Paris Office" } }],
  });
  expect(dataElement).toMatchInlineSnapshot(`
    <div
      data-testid="data"
    >
      {"companies":[{"node":{"id":"h_789","name":"Paris Office"}}]}
    </div>
  `);
});
