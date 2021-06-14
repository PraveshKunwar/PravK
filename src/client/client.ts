import { Client, Collection, Intents } from "discord.js";

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

  public async start(token: string): Promise<void> {
    this.login(token);
  }
}

export { Winbi };
