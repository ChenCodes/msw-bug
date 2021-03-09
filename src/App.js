import { gql, useQuery } from '@apollo/client';

const GET_COMPANIES = gql`
    query CompaniesQuery {
        companies {
          node {
            id
            name
          }
        }
    }
`;

function App() {
  const { loading, data, error } = useQuery(GET_COMPANIES);
  // console.log({loading, data, error})
  return (
      <div className="App" >
        {data && <div data-testid="data">{JSON.stringify(data)}</div>}
        {error && <div data-testid="error">{JSON.stringify(error)}</div>}
        {loading && <div data-testid="loading">{JSON.stringify(loading)}</div>}
      </div>
  );
}

export default App;
