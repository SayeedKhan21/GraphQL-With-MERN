import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

import {Router , Routes  ,Route} from 'react-router-dom'
import {
  ApolloProvider  ,
  ApolloClient ,
  InMemoryCache
} from '@apollo/client'
import Project from './pages/Project';



const cache = new InMemoryCache({
  typePolicies: {
    Query : {
      fields : {
        clients : {
          merge(existing ,incoming){
            return incoming
          }
        } ,
        projects : {
          merge(existing ,incoming){
            return incoming
          }
        }

      }
    }
  }
})

const client = new ApolloClient({
  uri : 'http://localhost:5000/graphql' ,
  cache : cache
})

function App() {
  return (
    <>
    <ApolloProvider client={client} >
      
        <Header />
        <div className='container' >
           <Routes >
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element ={<Project />} />
              <Route path='*' element={<NotFound />} />
           </Routes>
        </div>
   
    </ApolloProvider >
    </>
  );
}

export default App;
