import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import Counter from './components/Counter.js';
import Tenzies from './components/Tenzies.js';
import Quiz from './components/Quiz'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route path='/' exact> 
          <Home />  
        </Route>
        <Route path='counter'>
          <Counter />
        </Route>
        <Route path='/fetch-data'>
          <FetchData />
        </Route>
        <Route path='/tenzies'>
          <Tenzies />
        </Route>
        <Route path='/quiz'> 
          <Quiz /> 
        </Route>
        <Route path="*"
               element={
                 <h1>There is nothing here!</h1>
               }
        />
      </Layout>
    );
  }
}
