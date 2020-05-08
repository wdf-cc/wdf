import React from 'react';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login/';
import Home from './pages/Home/';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
           <Route exact path='/login' component={Login} />
           <Route path='/home' component={Home} />
        </Router>
      </Layout>
    </div>
  );
}

export default App;
