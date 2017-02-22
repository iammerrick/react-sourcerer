import React from 'react';

const { parse  } = require('babylon');

class ASTProvider extends React.Component {
  getChildContext() {
    return {
      ast: parse(this.props.source, {
        sourceType: 'module',
        plugins: [
          'jsx',
        ],
      }),
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
