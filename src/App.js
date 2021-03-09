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
  const { loading, data, error, refetch } = useQuery(GET_COMPANIES);  
  return (
      <div className="App" />
  );
}

export default App;
