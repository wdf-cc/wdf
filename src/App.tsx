import React from 'react';
import {Route,HashRouter as Router} from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home/';
import './App.css';
import TextToSound from './pages/TextToSound';

function App() {
  return (
    <div className="App">
      <Layout>
        <Router hashType="hashbang" >
           <Route path='/home' component={Home} />
           <Route path='/tts' component={TextToSound} />
        </Router>
      </Layout>
    </div>
  );
}

export default App;
