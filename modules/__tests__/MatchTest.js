import ASTProvider from '../ASTProvider';
import React from 'react';
import Match  from '../Match';
import Import, {getIdentifiersFromImport} from '../matchers/Import';
import MemberExpression from '../matchers/MemberExpression';
import * as t from 'babel-types';

import renderer from 'react-test-renderer';


describe('Match', () => {
  it('should match a class method', () => {
    const output = renderer.create(<ASTProvider source={`
      class Person {
        greet() {
        }
      }
    `}>
      <Match
        match={(path) => {
          return t.isClassMethod(path);
        }}
      >
        {
          ((matches) => {
            return (
              <div>
                {matches.map((path) => path.node.type)}
              </div>
            );
          })
        }
      </Match>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });

  it('should match a variable', () => {
    const output = renderer.create(<ASTProvider source={`
      const name = 'Merrick';
    `}>
      <Match
        match={(path) => {
          return t.isVariableDeclarator(path);
        }}
      >
        {
          ((matches) => {
            return (
              <div>
                {matches.map((path) => path.node.type)}
              </div>
            );
          })
        }
      </Match>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });

  it('should support callbacks for lateral composition', () => {
    class LodashAndForEach extends React.Component {
      state = {
        lodash: [],
        forEach: false,
      };

      handleImportMatch = (matches) => {
        if (matches.length >= 1) {
          const identifiers = getIdentifiersFromImport(matches);
          this.setState({
            lodash: identifiers,
          });
        }
      };

      handleMemberExpression = (matches) => {
        if (matches.length >= 1) {
          this.setState({
            forEach: true,
          });
        }
      };

      render() {
        return (
          <div>
            <Import from='lodash' onMatch={this.handleImportMatch} />
            <MemberExpression 
              name='forEach' 
              target={this.state.lodash} 
              onMatch={this.handleMemberExpression} 
            />
            { this.state.lodash.length > 0 && this.state.forEach
              ? 'Yes'
              : 'Nope' }
          </div>
        );
      }
    }

    const output = renderer.create(<ASTProvider source={`
      import _ from 'lodash';
      const fruits = [
        'Apples',
        'Oranges',
        'Grapes',
      ];

      _.forEach(fruits, (fruit) => {
        alert(fruit);
      });
    `}>
      <LodashAndForEach/>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });

  it('should allow match nesting', () => {
    const output = renderer.create(<ASTProvider source={`
      const name = 'Merrick';
      class Person {
        greet() {
          const age = 26;
        }
      }
    `}>

      <Match
        match={(path) => {
          return t.isClassMethod(path);
        }}
      >
        {
          ((matches) => {
            return (
              <div>
                {matches.map((method, key) => (
                  <Match
                    match={(potentialDeclarator) => {
                      return t.isVariableDeclarator(potentialDeclarator);
                    }}
                    key={key}
                    ast={method}
                  >
                    {
                      ((declarators) => {
                        return (
                          <div>
                            {declarators.map((path, index) => (
                              <div key={index}>{path.node.type}</div>
                            ))}
                          </div>
                        );
                      })
                    }
                  </Match>
                ))}
              </div>
            );
          })
        }
      </Match>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });
});
