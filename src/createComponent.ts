import * as Figma from 'figma-js';
import * as prettier from 'prettier';
import { getName } from './getName';

function addImport() {
  return `
    import * as React from 'react';
    import styled from 'styled-components';
  `;
}

// TODO - need to build out children
function createChildren(children: ReadonlyArray<Figma.Node>): [string, string] {
  return ['<div>Hello World!</div>', ''];
}

function addContainer(children: ReadonlyArray<Figma.Node>, reactChildren: string) {
  // If there are multiple children, return a fragment
  if (children.length > 1) {
    return `<React.Fragment>${reactChildren}</React.Fragment>`;
  }
  return reactChildren;
}

export function createComponent(node: null | Figma.Node): [null, null] | [string, string] {
  if (!node || node.type !== 'COMPONENT') {
    return [null, null];
  }

  const [children, styledChildren] = createChildren(node.children);
  const name = getName(node.name);
  const component = prettier.format(
    `
    ${addImport()}

    export function ${name}() {
      return (
        ${addContainer(node.children, children)}
      )
    }

    ${styledChildren}
  `,
    { parser: 'babel' }
  );

  return [name, component];
}
