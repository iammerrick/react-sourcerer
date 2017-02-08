import React from 'react';
import traverse from 'babel-traverse';

class Match extends React.Component {
  render() {
    const matches = [];
    const matchTest = this.props.match;

    const walk = {
      enter(path) {
        const isMatch = matchTest(path);

        if (isMatch) {
          matches.push(
            path
          );
        }
      },
    };

    if (this.props.ast) {
      this.props.ast.traverse(walk);
    } else {
      traverse(this.context.ast, walk);
    }

    return React.Children.only(this.props.children(matches));
  }
}

Match.contextTypes = {
  ast: React.PropTypes.object,
};

export default Match;
