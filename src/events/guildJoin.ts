import { Guild } from "discord.js";
import { EventFunc } from "../typedefs/commandEvent";
export const run: EventFunc = async (client, guild: Guild) => {
  console.log(`Joined ${guild.name}`);
  //other stuff will be added later on!
};

export const name: string = "guildCreate";