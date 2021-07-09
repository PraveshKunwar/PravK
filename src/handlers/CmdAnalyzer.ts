import { readFile } from 'fs/promises';
import { Stats, statSync } from 'fs';

interface Analyzer {
   path: string;
}

export const cmdAnalyzer = async ({
   path
}: Partial<Readonly<Analyzer>>): Promise<{
   file: string;
   stats: Stats;
}> => {
   const file = await readFile(path, 'utf8');
   const stats = statSync(path, {
      bigint: false,
      throwIfNoEntry: true
   });

   return { file, stats };
};
