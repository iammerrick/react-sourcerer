import React from 'react';
import traverse from 'babel-traverse';
import shallowEqual from './utils/shallowEqual';

const isMatching = ({match, ast}, context) => {
  const matches = [];

  const walk = {
    enter(path) {
      const isMatch = match(path);

      if (isMatch) {
        matches.push(
          path
        );
      }
    },
  };

  if (ast) {
    ast.traverse(walk);
  } else {
    traverse(context.ast, walk);
  }

  return matches;
};

class Match extends React.Component {

  state = {
    matches: isMatching(this.props, this.context),
  }

  componentWillReceiveProps(next) {
    if (shallowEqual(next, this.props)) return null;
    this.setState({
      matches: isMatching(next, this.context),
    });
  }

  componentDidUpdate(_, prev) {
    if (prev.matches !== this.state.matches) {
      this.props.onMatch && this.props.onMatch(this.state.matches);
    }
  }

  componentDidMount() {
    this.props.onMatch && this.props.onMatch(this.state.matches);
  }

  render() {
    return this.props.children 
      ? React.Children.only(this.props.children(this.state.matches))
      : null;
  }
}

Match.contextTypes = {
  ast: React.PropTypes.object,
};

export default Match;
