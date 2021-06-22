export const codeblock = (text: string | number, lang?: string) => {
  return `\`\`\`${lang}\n${text}\`\`\``;
};

export const oneblock = (text: string | number | void) => {
  return `\`${text}\``;
};
