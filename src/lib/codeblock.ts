export const codeblock = (
   text: string | number,
   lang?: string
): string => {
   return `\`\`\`${lang}\n${text}\`\`\``;
};

export const oneblock = (
   text: string | number | void
): string => {
   return `\`${text}\``;
};
