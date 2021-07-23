import { Guild } from 'discord.js';
import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (
   client,
   guild: Guild
) => {
   console.log(`Left ${guild.name}`);
};

export const name = 'guildDelete';
