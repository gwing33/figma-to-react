import * as Figma from 'figma-js';
import * as prettier from 'prettier';
import { getName } from './getName';

function isNotNull<T>(a: T | null): a is T {
  return a !== null;
}

interface ReactComponent {
  name: string;
  component: string;
  styles: Object;
}

interface Fiber {
  id: string;
  children: null | Fiber | (null | Fiber)[];
  content: null | string;
}

interface Tree {
  components: ReactComponent[];
  tree: Fiber;
}

function buildStyles(node: Figma.Node) {
  // TODO
  console.log(node);

  return {};
}

function buildContent({ id, children, content }: Fiber): string {
  if (Array.isArray(children) && children.length === 1) {
    const childFiber = children[0];
    if (childFiber !== null) {
      return `(
        <${childFiber.id}>
          ${childFiber.content || ''}
        </${childFiber.id}>
      )`;
    }
  }

  return 'null';
}

function createComponent(node: null | Figma.Node): [null | ReactComponent[], null | Fiber] {
  if (node === null) {
    return [null, null];
  }

  const name = getName(node.name);
  const children = getChilrenNodes(node) || [];
  const childrenComponents = children.map((c) => createComponent(c));

  const fiber = {
    id: name,
    children: childrenComponents.map(([x, f]) => f),
    content: node.type === 'TEXT' ? node.characters : null,
  };

  const component: ReactComponent = {
    name,
    component: prettier.format(functionWrap(name, buildContent(fiber)), { parser: 'babel' }),
    styles: buildStyles(node),
  };

  const components: ReactComponent[] = childrenComponents
    .map(([x]) => x)
    .filter(isNotNull)
    .reduce((acc, cs) => acc.concat(cs), []);

  return [components.concat(component), fiber];
}

export function createTree(node: null | Figma.Node, tree?: Tree): Tree {
  const [components, fiber] = createComponent(node);

  return {
    components: ((tree && tree.components) || []).concat(components || []),
    tree: {
      id: 'root',
      children: fiber,
      content: null,
    },
  };
}

function addImport() {
  return `
    import * as React from 'react';
    import styled from 'styled-components';
  `;
}

function getChilrenNodes(parentNode: Figma.Node): ReadonlyArray<Figma.Node> {
  switch (parentNode.type) {
    case 'COMPONENT':
    case 'GROUP':
    case 'CANVAS':
    case 'DOCUMENT':
    case 'BOOLEAN':
    case 'FRAME':
    case 'INSTANCE':
      return parentNode.children;
  }
  return [];
}

function functionWrap(name: string, children: string) {
  return `
    function ${name}() {
      return ${children};
    }
  `;
}

function fragmentWrap(children: string) {
  return `
    <React.Fragment>
      ${children}
    </React.Fragment>
  `;
}
