import React from 'react';
import {render} from 'react-dom';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

// Todo 这里需要导入 perfect css
// import 'perfect-css';

import InputExample from './components/InputExample';
import Home from './components/Home';
import './sass/example.scss';

const Examples = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/input" component={InputExample}/>
    </div>
  </Router>
);

render(<Examples/>, document.getElementById('layout'));
