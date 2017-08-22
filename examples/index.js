import React from 'react';
import {render} from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './components/Home';
import InputExample from './components/InputExample';
import GridExample from './components/grid/GridExample';
import ToastExample from './components/ToastExample';

import 'perfect-css';
import './sass/example.scss';

const Examples = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/input" component={InputExample}/>
      <Route path="/grid" component={GridExample}/>
      <Route path="/toast" component={ToastExample}/>
    </div>
  </Router>
);

render(<Examples/>, document.getElementById('layout'));
