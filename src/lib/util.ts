import {
   Client,
   GuildChannel,
   GuildMember,
   Message,
   Snowflake,
   User,
   Util
} from 'discord.js';

export default class Utility extends Util {
   public async getChannel(
      message: Message,
      id?: Snowflake,
      name?: string
   ): Promise<GuildChannel> {
      const channel: GuildChannel =
         (await message.guild.channels.fetch(id)) ||
         message.guild.channels.cache.find(
            (i) => i.name === name
         );
      return channel;
   }
   public async getUser(
      message: Message,
      id?: Snowflake,
      username?: string,
      client?: Client
   ): Promise<User | GuildMember> {
      const user: User | GuildMember =
         (await client.users.fetch(id)) ||
         client.users.cache.get(id) ||
         client.users.cache.find(
            (i) => i.username === username
         ) ||
         message.guild.members.cache.get(id) ||
         message.guild.members.cache.find(
            (i) => i.user.username === username
         );
      return user;
   }
}
