import { DMChannel, GuildChannel } from 'discord.js';
import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (
   client,
   channel: DMChannel | GuildChannel
) => {
   console.log(
      `${(channel as GuildChannel).name} was deleted!`
   );
};

export const name = 'channelDelete';
