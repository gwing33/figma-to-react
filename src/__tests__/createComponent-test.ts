import fileJson from '../__fixtures__/file.json';
import { createTree } from '../createComponent';
import { findComponent } from '../findComponent';
import * as Figma from 'figma-js';

const file: any = fileJson; // Weird error, so just bail out

describe('Test Create Component', () => {
  test('Should create a simple component', () => {
    const component = findComponent(file.document, '1:3');
    expect(createTree(component)).toBe('');
  });
});
