import React, { Component } from 'react';
import { Route, HashRouter as Router, Link, RouteComponentProps, Redirect } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home/';
import './App.css';
import TextToSound from './pages/TextToSound';
import { Container, Row, Col } from 'react-bootstrap';
import Bindppt from './pages/Bindppt';

export default class App extends Component {

  // gotoHome(){
  //   window. 
  // }

  render() {
    return (
      <div className="App">
          <Row>
            <Col md={{ span: 6, offset: 3 }} xs={12} >
              <Router hashType="hashbang">
                <h4>
                  <Link to="/home">
                    Hi！React
                </Link>
                </h4>
                <em><small>Powered By Jonny</small></em>
              </Router>
              <hr />
            </Col>
          </Row>
        <Layout>
          <Router hashType="hashbang" >
            <Route path='/home' component={Home} />
            <Route path='/tts' component={TextToSound} />
            <Route path='/bindppt' component={Bindppt} />
            <Redirect from="/" to="/home" />
          </Router>
        </Layout>
      </div>
    );

  }
}

