import ASTProvider from '../../ASTProvider';
import React from 'react';
import Variable from '../Variable';
import ClassMethod from '../ClassMethod';

import renderer from 'react-test-renderer';

describe('Matcher Composition', () => {
  it('should match a variable', () => {
    const output = renderer.create(<ASTProvider source={`
      const age = 12
      class Person {
        greet() {
          const name = 'Merrick';
        }
      }
    `}>
      <ClassMethod>
        {(methods) => 
          <div>
            {methods.map((method, index) => (
              <Variable
                ast={method}
                key={index}
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
              </Variable>
            ))}
          </div>
        }
      </ClassMethod>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });
});
