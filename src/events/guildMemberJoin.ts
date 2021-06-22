import { GuildMember } from "discord.js";
import { EventFunc } from "../typedefs/commandEvent";

export const run: EventFunc = async (client, member: GuildMember) => {
  console.log(`${member.user.tag} has joined!`);
};

export const name: string = "guildMemberAdd";
