import { DMChannel, Guild, GuildChannel } from "discord.js";
import { EventFunc } from "../typedefs/commandEvent";

export const run: EventFunc = async (
  client,
  oldChannel: DMChannel | GuildChannel,
  newChannel: DMChannel | GuildChannel
) => {
  console.log(`Channel was updated!`);
};

export const name: string = "channelUpdate";
