import { GuildChannel } from "discord.js";
import { EventFunc } from "../typedefs/commandEvent";

export const run: EventFunc = async (client, channel: GuildChannel) => {
  console.log(`${channel.name} was created!`);
};

export const name: string = "channelCreate";
