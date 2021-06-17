import { Client, Collection, Intents } from "discord.js";
import glob from "glob";
import { Pattern } from "src/interfaces/cmdEvtTypes";
import { promisify } from "util";

class Winbi extends Client {
  public constructor() {
    super({
      ws: {
        intents: Intents.ALL,
      },
      partials: ["MESSAGE", "GUILD_MEMBER", "REACTION", "USER", "CHANNEL"],
      retryLimit: Number.POSITIVE_INFINITY,
    });
  }
  public commands = new Collection<string, string>();
  public events = new Collection<string, string>();
  public globPromised = promisify(glob);
  public async cmdEvtHandler({
    CmdPattern,
    EvtPattern,
  }: Partial<Readonly<Pattern>>) {
    const cmd: string[] = await this.globPromised(CmdPattern as string);
    console.log(cmd);
  }

  public async start(token: string): Promise<void> {
    this.login(token);
    this.cmdEvtHandler({
      CmdPattern: `${__dirname}/../commands/**/*{.js,.ts}`,
      EvtPattern: `../commands/**/*{.ts,.js}`,
    });
  }
}

export { Winbi };
