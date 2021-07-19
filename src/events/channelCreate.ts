import { GuildChannel } from 'discord.js';
import { EventFunc } from '../typedefs/CommandEvent';

export const run: EventFunc = async (
   client,
   channel: GuildChannel
) => {
   console.log(`${channel.name} was created!`);
};

export const name = 'channelCreate';
