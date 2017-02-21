#!/usr/bin/env babel-node

import React from 'react';
import renderer from 'react-test-renderer';
import ASTProvider from '../../modules/ASTProvider';
import Import from '../../modules/matchers/Import';
import CallExpression from '../../modules/matchers/CallExpression'
import recast from 'recast';

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
    if (element.type === 'suggestion') {
      output.push(
        element.children.join('')
      );
      output.push('\n');
    }
  });
  return output.join('\n');
};

getStdin()
  .then((source) => {

    const results = renderer.create(
      <ASTProvider source={source}>
        <errors>
          <Import
            source='lodash'
            >
            {([importMatch]) => {
              return (
                <CallExpression> 
                  {(matches) => {
                    return (
                      <suggestions>
                        {matches.filter((match) => {
                          if(!match.node.callee.object) return false;
                          return match.node.callee.object.name === importMatch.node.specifiers[0].local.name && match.node.callee.property.name === 'forEach';
                        }).map((match, key) => {
                          const name = match.node.arguments[0].name;
                          return (
                            <suggestions key={key}>
                              <suggestion>
                                Line {match.node.loc.start.line}: In ES2015, arrays have a built in forEach method, try:
                              </suggestion>
                              <suggestion>
                                {name}.forEach({recast.print(match.node.arguments[1]).code})
                              </suggestion>
                              <suggestion>
                                And delete line {importMatch.node.loc.start.line}: {recast.print(importMatch.node).code}
                              </suggestion>
                              <suggestion>
                                You can learn more about forEach here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
                              </suggestion>
                            </suggestions>
                          );
                        })}
                      </suggestions>
                    );
                  }}
                </CallExpression>
              );
            }}
          </Import>
        </errors>
      </ASTProvider>
    );

    process.stdout.write(
      `${log(results.toJSON())}\n`
    );
  });
