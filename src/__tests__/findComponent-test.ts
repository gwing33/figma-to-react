import { findComponent } from '../findComponent';
import fileJson from '../__fixtures__/file.json';

describe('Find Component', () => {
  test('Should not find any component', () => {
    expect(findComponent(fileJson.document, '2:2')).toBe(null);
  });
  test('Should not find any component', () => {
    const node = fileJson.document.children[0].children[0];
    expect(findComponent(fileJson.document, '1:3')).toBe(node);
  });
});
