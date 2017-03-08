import React from 'react';
import Match from '../Match';
import * as t from 'babel-types';

class MemberExpression extends React.Component {
  handleMatch = (path) => {
    const { name, target } = this.props;
    const isMemberExpression = t.isMemberExpression(path);
    if (!isMemberExpression) return false;
    if (target && Array.isArray(target) && target.includes(path.node.object.name)) return true;
    if (target && target !== path.node.object.name) return false;
    if (name && name !== path.node.property.name) return false;
    return isMemberExpression;
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

export default MemberExpression;
