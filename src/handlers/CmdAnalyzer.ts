import { readFile, writeFile } from "fs/promises";
import {statSync } from "fs";

type toGet = "all" | "name" | "aliases" | "desc" | "cooldowns";

interface Analyzer {
  path: string;
}

export const cmdAnalyzer = async ({ path,}: Partial<Readonly<Analyzer>>) => {
  const file = await readFile(path, "utf8");
  const stats = statSync(path, { bigint: false, throwIfNoEntry: true });

  return { file, stats };
};
