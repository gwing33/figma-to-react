import * as Figma from 'figma-js';

export function findComponent(child: Figma.Node, id: string): null | Figma.Node {
  if (child.type === 'CANVAS' || child.type === 'GROUP' || child.type === 'DOCUMENT') {
    return child.children.reduce((acc, c) => {
      if (c.id === id) {
        return c;
      }
      return !acc ? findComponent(c, id) : acc;
    }, null);
  }
  return null;
}
