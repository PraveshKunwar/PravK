import { GuildMember } from 'discord.js';
import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (
   client,
   member: GuildMember
) => {
   console.log(`${member.user.tag} has joined!`);
};

export const name = 'guildMemberAdd';
