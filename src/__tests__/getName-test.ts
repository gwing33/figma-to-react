import { cleanName, formatName, getName } from '../getName';

describe('Get Name Tests', () => {
  test('Should formatName the name', () => {
    expect(formatName('Some component name')).toBe('SomeComponentName');
    expect(formatName('some component name')).toBe('SomeComponentName');
    expect(formatName('some name')).toBe('SomeName');
    expect(formatName('some')).toBe('Some');
    expect(formatName('')).toBe('');
  });
  test('Should cleanName', () => {
    expect(cleanName('Some component name')).toBe('Some component name');
    expect(cleanName('Some-component name')).toBe('Some component name');
    expect(cleanName('Some-component.name')).toBe('Some component name');
    expect(cleanName('~!@#$%^&*()=+`[],?<>|\\{}Some-component.name')).toBe('Some component name');
    expect(cleanName('Some-component.name123')).toBe('Some component name123');
    expect(cleanName('123Some-component.name123')).toBe('Some component name123');
  });

  test('Should getName', () => {
    expect(getName('Some component name')).toBe('SomeComponentName');
    expect(getName('Some-component name')).toBe('SomeComponentName1');
    expect(getName('Some-component.name')).toBe('SomeComponentName2');
    expect(getName('Some-component.name', 'Styled')).toBe('StyledSomeComponentName');
    expect(getName('~!@#$%^&*()=+`[],?<>|\\{}Some-component.name')).toBe('SomeComponentName3');
    expect(getName('Some-component.name123')).toBe('SomeComponentName123');
    expect(getName('123Some-component.name123')).toBe('SomeComponentName1231');
  });
});
