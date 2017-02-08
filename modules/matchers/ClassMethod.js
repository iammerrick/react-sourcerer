import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class ClassMethod extends React.Component {
  render() {
    return (
      <Match
        {...this.props}
        match={(path) => {
          const {name} = this.props;
          const isClassMethod = t.isClassMethod(path);
          if (!isClassMethod) return false;
          if (name && path.node.computed) return false;
          if (name && name !== path.node.key.name) return false;
          return isClassMethod;
        }}
      />
    );
  }
}

export default ClassMethod;
