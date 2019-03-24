// https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function formatName(name: string): string {
  const camelized = camelize(name);
  return camelized.charAt(0).toUpperCase() + camelized.substr(1);
}

export function cleanName(name: string): string {
  return name
    .replace(/[-\.]/g, ' ') // Swap - and . for space
    .replace(/[^0-9a-zA-Z\s]/g, '') // Remove any non alphanumeric
    .replace(/^[0-9]+/g, ''); // Remove numbers if at the beginning
}

// Global map of all generated names, avoid duplicates
const names: Object = {};

export function getName(name: string, counter = 0): string {
  const suffix = counter > 0 ? counter : '';
  const clearName = formatName(cleanName(name));
  const fullName = clearName + suffix;

  if (names[fullName]) {
    return getName(clearName, counter + 1);
  }
  names[fullName] = fullName;

  return fullName;
}
