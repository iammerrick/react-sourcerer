#!/usr/bin/env babel-node

import React from 'react';
import renderer from 'react-test-renderer';
import ASTProvider from '../../modules/ASTProvider';
import ClassMethod from '../../modules/matchers/ClassMethod';
import Program from '../../modules/matchers/Program';
import Variable from '../../modules/matchers/Variable';
import Function from '../../modules/matchers/Function';

const getStdin = () => {
  const stdin = process.stdin;
	let ret = '';

	return new Promise(resolve => {
		if (stdin.isTTY) {
			resolve(ret);
			return;
		}

		stdin.setEncoding('utf8');

		stdin.on('readable', () => {
			let chunk;

			while ((chunk = stdin.read())) {
				ret += chunk;
			}
		});

		stdin.on('end', () => {
			resolve(ret);
		});
	});
};

const depth = (tree, visit) => {
  if (!tree.type) return null;
  visit(tree);

  if (!tree.children) return null;
  tree.children.forEach((element) => {
    depth(element, visit);
  });
};

const log = (tree) => {
  const output = [];
  depth(tree, (element) => {
    if (element.type === 'stat') {
      output.push(
        element.children.join('')
      );
    }
  });
  return output.join('\n');
};

getStdin()
  .then((source) => {

    const results = renderer.create(
      <ASTProvider source={source}>
        <stats>
          <Program>
            {([program]) => (
              <stats>
                <stat>Lines: {program.node.loc.end.line}</stat>
                <stat>Characters: {program.node.end}</stat>
              </stats>
            )}
          </Program>
          <Function>
            {(functions) => <stat>Functions: {functions.length}</stat>}
          </Function>
          <ClassMethod>
            {(methods) => <stat>Class Methods: {methods.length}</stat>}
          </ClassMethod>
          <Variable>
            {(variables) => <stat>Variables: {variables.length}</stat>}
          </Variable>
        </stats>
      </ASTProvider>
    );

    process.stdout.write(
      `${log(results.toJSON())}\n`
    );
  });
