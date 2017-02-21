import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class Identifier extends React.Component {
  render() {
    return (
      <Match
        {...this.props}
        match={(path) => {
          return t.isIdentifier(path);
        }}
      />
    );
  }
}

export default Identifier;
