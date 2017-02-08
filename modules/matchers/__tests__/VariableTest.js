import ASTProvider from '../../ASTProvider';
import React from 'react';
import Variable from '../Variable';

import renderer from 'react-test-renderer';

describe('Variable', () => {
  it('should match a variable', () => {
    const output = renderer.create(<ASTProvider source={`
      const name = 'Merrick';
    `}>
      <Variable>
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
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });

  it('should filter a variable by name', () => {
    const output = renderer.create(<ASTProvider source={`
      const name = 'Merrick';
      const age = 26;
    `}>
      <Variable name='age'>
        {
          ((matches) => {
            return (
              <div>
                {matches.map((path) => path.node.id.name)}
              </div>
            );
          })
        }
      </Variable>
    </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });
});
