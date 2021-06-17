import glob from "glob";

interface Pattern {
  Pattern1: string;
  Pattern2: string;
}

export const cmdEvtHandler = async ({
  Pattern1,
  Pattern2,
}: Pattern): Promise<void> => {};
