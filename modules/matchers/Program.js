import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class Program extends React.Component {
  render() {
    return (
      <Match
        {...this.props}
        match={(path) => {
          return t.isProgram(path);
        }}
      />
    );
  }
}

export default Program;
