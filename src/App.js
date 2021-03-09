import { gql, useQuery } from '@apollo/client';

import logo from './logo.svg';
import './App.css';

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
<<<<<<< HEAD
  const { loading, data, error, refetch } = useQuery(GET_COMPANIES);  
  console.log('data', data);
  console.log('error', error);
=======
  const { loading, data, error, refetch } = useQuery(GET_COMPANIES);
  // console.log({loading, data, error})
>>>>>>> fa37f45... create repro case
  return (
      <div className="App" >
        {data && <div data-testid="data">{JSON.stringify(data)}</div>}
        {error && <div data-testid="error">{JSON.stringify(error)}</div>}
        {loading && <div data-testid="loading">{JSON.stringify(loading)}</div>}
      </div>
  );
}

export default App;
