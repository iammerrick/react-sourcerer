import ASTProvider from '../../ASTProvider';
import React from 'react';
import ClassMethod from '../ClassMethod';

import renderer from 'react-test-renderer';
describe('ClassMethod', () => {
  it('should match a class method', () => {
    const output = renderer.create(<ASTProvider source={`
      class Person {
        greet() {
        }

        goodbye() {
        }
      }
    `}>
      <ClassMethod>
        {
          ((matches) => {
            return (
              <div>
                {matches.map((path) => path.node.type)}
              </div>
            );
          })
        }
      </ClassMethod>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });

  it('should allow filtering based on method name', () => {
    const output = renderer.create(<ASTProvider source={`
      class Person {
        goodbye() {
        }

        greet() {
        }
      }
    `}>
      <ClassMethod name='greet'>
        {
          ((matches) => {
            return (
              <div>
                {matches.map((path) => path.node.key.name)}
              </div>
            );
          })
        }
      </ClassMethod>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });

  it('should ignore computed method names', () => {
    const output = renderer.create(<ASTProvider source={`
      const computed = () => 'age'; 
      class Person {
        [goodbye]() {
        }

        greet() {
        }

        goodbye() {
        }
      }
    `}>
    <ClassMethod name='goodbye'>
        {
          ((matches) => {
            return (
              <div>
                {matches.map((path) => path.node.key.name)}
              </div>
            );
          })
        }
      </ClassMethod>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });
});
