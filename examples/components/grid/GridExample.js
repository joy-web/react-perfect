import React, {Component} from 'react';
import Row from '../../../components/grid/Row';
import Col from '../../../components/grid/Col';

const GridExample = () => {
  return (
    <div className="container example-row">
      <Row>
        <Col className="col">col</Col>
        <Col className="col">col</Col>
        <Col className="col">col</Col>
      </Row>
    </div>
  );
};

export default GridExample;
