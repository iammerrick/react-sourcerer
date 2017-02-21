import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class Import extends React.Component {
  render() {
    return (
      <Match
        {...this.props}
        match={(path) => {
          const {from} = this.props;
          const isImportDeclaration = t.isImportDeclaration(path);
          if (!isImportDeclaration) return false;
          if (from && from !== path.node.source.value) return false;
          return isImportDeclaration;
        }}
      />
    );
  }
}

export default Import;
