import React from 'react';
import {
  Link
} from 'react-router-dom';

const Home = () => {
  return (
    <div className="example">
      <h3>React Perfect Component 例子</h3>
      <ol className="example-list">
        <li><Link to="/input">Input 组件</Link></li>
        <li><Link to="/grid">Grid 组件</Link></li>
        <li><Link to="/toast">Toast 组件</Link></li>
      </ol>
    </div>
  );
};

export default Home;
