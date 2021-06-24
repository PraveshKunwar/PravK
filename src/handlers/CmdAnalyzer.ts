import { readFile } from "fs/promises";
import { statSync } from "fs";

interface Analyzer {
  path: string;
}

export const cmdAnalyzer = async ({ path }: Partial<Readonly<Analyzer>>) => {
  const file = await readFile(path, "utf8");
  const stats = statSync(path, { bigint: false, throwIfNoEntry: true });

  return { file, stats };
};
