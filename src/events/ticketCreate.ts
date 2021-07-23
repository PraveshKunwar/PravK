import { TextChannel } from 'discord.js';
import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (
   client,
   channel: TextChannel
) => {
   console.log(channel.name);
};

export const name = 'ticketCreate';
