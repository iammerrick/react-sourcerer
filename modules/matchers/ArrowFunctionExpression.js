import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class ArrowFunctionExpression extends React.Component {
  render() {
    return (
      <Match
        {...this.props}
        match={(path) => {
          return t.isArrowFunctionExpression(path);
        }}
      />
    );
  }
}

export default ArrowFunctionExpression;
