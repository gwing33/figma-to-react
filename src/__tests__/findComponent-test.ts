import { findComponent } from '../findComponent';
import fileJson from '../__fixtures__/file.json';

const file: any = fileJson; // Weird error, so just bail out

describe('Find Component', () => {
  test('Should not find any component', () => {
    expect(findComponent(file.document, '2:2')).toBe(null);
  });
  test('Should not find any component', () => {
    const node = fileJson.document.children[0].children[0];
    expect(findComponent(file.document, '1:3')).toBe(node);
  });
});
