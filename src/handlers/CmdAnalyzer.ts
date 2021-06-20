import { readFile } from "fs/promises";

type toGet = "all" | "name" | "aliases" | "desc" | "cooldowns";

interface Analyzer {
  path: string;
  toGet: toGet;
}

export const cmdAnalyzer = async ({
  path,
  toGet,
}: Partial<Readonly<Analyzer>>): Promise<string> => {
  const file = await readFile(path, "utf8");
  return file;
};
