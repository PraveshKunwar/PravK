import { GuildMember } from 'discord.js';
import { EventFunc } from '../typedefs/CommandEvent';

export const run: EventFunc = async (
   client,
   member: GuildMember
) => {
   console.log(`${member.user.tag} has joined!`);
};

export const name = 'guildMemberAdd';
