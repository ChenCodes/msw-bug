Run reproduction steps:

- `npm install`
- `npm test`

Background:

- The tests use `msw` (mock service worker) with the graphql mocking functions to simulate calls to the backend.
- Two tests use the same component but are set up to return different mock data from a query using `server.use()` (e.g., alternate data, or an error instead of data response).
- The msw server starts listening in `beforeAll` and handlers are cleared in `afterEach()`
- **The Bug**: The mock data is never replaced after the first response. The second test gets data defined in the first test.
