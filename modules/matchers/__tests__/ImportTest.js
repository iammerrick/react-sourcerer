import ASTProvider from '../../ASTProvider';
import React from 'react';
import Identifier from '../Identifier';
import Import, { getIdentifiersFromImport } from '../Import';

import renderer from 'react-test-renderer';

describe('Import', () => {
  it('Should sub match for identifier', () => {
    const output = renderer.create(<ASTProvider source={`
    import _, { forEach } from 'lodash';
    `}>
    <Import from={'lodash'}>
      {(imports) => (
        <div>
          {imports.map((match, index) => (
            <Identifier ast={match} key={index}>
              {(identifiers) => (
                <div>
                  {identifiers.map((identifier, n) => 
                    <div key={n}>{identifier.node.name}</div>
                  )}
                </div>
              )}
            </Identifier>
          ))}
        </div>
      )}
    </Import>
  </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });

  it('should extract all locals from import', () => {
    const output = renderer.create(<ASTProvider source={`
    import _, { forEach } from 'lodash';
    `}>
    <Import from={'lodash'}>
      {(imports) => (
        <div>{getIdentifiersFromImport(imports)}</div>
      )}
    </Import>
  </ASTProvider>);

    expect(output.toJSON()).toMatchSnapshot(); 
  });
});
