export function parseMapData(data: string): { [key: string]: string } {
  const sectionPattern = /^(.+)\{([^}]+)\}/gm;
  const result: { [key: string]: string } = {};
  let match;

  while ((match = sectionPattern.exec(data)) !== null) {
    const key = match[1].trim();
    const content = match[2].trim();
    result[key] = `${key}{\n${content}\n}`;
  }

  return result;
}
