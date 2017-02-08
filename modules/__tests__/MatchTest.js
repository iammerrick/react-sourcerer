import ASTProvider from '../ASTProvider';
import React from 'react';
import Match  from '../Match';
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
