import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class CallExpression extends React.Component {
  render() {
    return (
      <Match
        {...this.props}
        match={(path) => {
          const isCallExpression = t.isCallExpression(path);
          if (!isCallExpression) return false;
          return isCallExpression;
        }}
      />
    );
  }
}

export default CallExpression;
