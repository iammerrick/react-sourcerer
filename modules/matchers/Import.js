import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class Import extends React.Component {
  handleMatch = (path) => {
    const {from} = this.props;
    const isImportDeclaration = t.isImportDeclaration(path);
    if (!isImportDeclaration) return false;
    if (from && from !== path.node.source.value) return false;
    return isImportDeclaration;
  }

  render() {
    return (
      <Match
        {...this.props}
        match={this.handleMatch}
      />
    );
  }
}

export const getIdentifiersFromImport = (matches) => {
  return matches.reduce((memo, match) => {
    const specifiers = match.node.specifiers.map((specifier) => {
      return specifier.local.name;
    });
    return [...memo, ...specifiers];
  }, []);
};

export default Import;
