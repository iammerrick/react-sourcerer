import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class Variable extends React.Component {
  render() {
    return (
      <Match
        {...this.props}
        match={(path) => {
          const {name} = this.props;
          const isDeclarator = t.isVariableDeclarator(path);
          if (!isDeclarator) return false;
          if (name && name !== path.node.id.name) return false;
          return isDeclarator;
        }}
      />
    );
  }
}

export default Variable;
