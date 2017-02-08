import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class Function extends React.Component {
  render() {
    return (
      <Match
        {...this.props}
        match={(path) => {
          const {name} = this.props;
          const isFunction = t.isFunctionDeclaration(path);
          if (!isFunction) return false;
          if (name && name !== path.node.id.name) return false;
          return isFunction;
        }}
      />
    );
  }
}

export default Function;
