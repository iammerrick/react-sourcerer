import React from 'react';
import {parse} from 'babylon';

class ASTProvider extends React.Component {
  getChildContext() {
    return {
      ast: parse(this.props.source),
    };
  }

  render() {
    return (
      React.Children.only(this.props.children)
    );
  }
}

ASTProvider.childContextTypes = {
  ast: React.PropTypes.object,
};

export default ASTProvider;
