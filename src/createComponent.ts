import * as Figma from 'figma-js';
import * as prettier from 'prettier';
import { getName } from 'getName';

function addImport() {
  return `
    import * as React from 'react';
    import styled from 'styled-components';
  `;
}

function addContainer(children: ReadonlyArray<Figma.Node>, reactChildren: string) {
  // If there are multiple children, return a fragment
  if (children.length > 1) {
    return `<React.Fragment>${reactChildren}</React.Fragment>`;
  }
  return reactChildren;
}

// TODO - need to build out children
function createChildren(children: ReadonlyArray<Figma.Node>): [string, string] {
  return ['<div></div>', ''];
}

export function createComponent(node: null | Figma.Node): string {
  if (!node || node.type !== 'COMPONENT') {
    return '';
  }

  const [children, styledChildren] = createChildren(node.children);
  console.log(children, styledChildren);

  return prettier.format(`
    ${addImport()}

    export function ${getName(node.name)}() {
      return (
        ${addContainer(node.children, children)}
      )
    }

    ${styledChildren}
  `);
}
