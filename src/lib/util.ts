import {
   GuildChannel,
   GuildMember,
   Snowflake,
   User,
   EmbedFieldData,
   FileOptions,
   MessageAttachment,
   MessageEmbed,
   ThreadChannel,
   Guild,
   CommandInteraction,
   ButtonInteraction
} from 'discord.js';
import { ChannelTypes } from 'discord.js/typings/enums';
import { PravK } from '../client';

type ColorResolvable =
   | 'DEFAULT'
   | 'WHITE'
   | 'AQUA'
   | 'GREEN'
   | 'BLUE'
   | 'YELLOW'
   | 'PURPLE'
   | 'LUMINOUS_VIVID_PINK'
   | 'FUCHSIA'
   | 'GOLD'
   | 'ORANGE'
   | 'RED'
   | 'GREY'
   | 'DARKER_GREY'
   | 'NAVY'
   | 'DARK_AQUA'
   | 'DARK_GREEN'
   | 'DARK_BLUE'
   | 'DARK_PURPLE'
   | 'DARK_VIVID_PINK'
   | 'DARK_GOLD'
   | 'DARK_ORANGE'
   | 'DARK_RED'
   | 'DARK_GREY'
   | 'LIGHT_GREY'
   | 'DARK_NAVY'
   | 'BLURPLE'
   | 'GREYPLE'
   | 'DARK_BUT_NOT_BLACK'
   | 'NOT_QUITE_BLACK'
   | 'RANDOM';

export interface EmbedData {
   fields: Required<EmbedFieldData[]>;
   name: string;
   value: string;
   inline?: boolean;
   files: Array<FileOptions | string | MessageAttachment>;
   authorName: string;
   authorIcon: string;
   color: ColorResolvable;
   desc: string;
   footer: {
      text: string;
      iconURL?: string;
   };
   image: string;
   thumbnail: string;
   timestamp: boolean;
   title: string;
   url: string;
}

export default class Utility {
   client: PravK;
   public constructor(client: PravK) {
      this.client = client;
   }
   public async getGuild(
      interaction: CommandInteraction,
      id?: Snowflake,
      name?: string
   ): Promise<Guild> {
      const guild: Guild =
         this.client.guilds.cache.get(id) ||
         this.client.guilds.cache.find(
            (i) => i.name === name
         ) ||
         (await this.client.guilds.fetch(id)) ||
         (await interaction.guild.fetch());
      return guild;
   }
   public async getChannel(
      interaction: CommandInteraction | ButtonInteraction,
      id?: Snowflake,
      type?: Exclude<
         keyof typeof ChannelTypes,
         'DM' | 'GROUP_DM' | 'UNKNOWN'
      >,
      name?: string
   ): Promise<GuildChannel | ThreadChannel> {
      const channel: GuildChannel | ThreadChannel = id
         ? await interaction.guild.channels.fetch(id)
         : interaction.guild.channels.cache.find(
              (i) => i.name === name && i.type === type
           );
      return channel;
   }
   public async getUser(
      interaction: CommandInteraction,
      id?: Snowflake,
      username?: string
   ): Promise<User> {
      const user: User =
         (await this.client.users.fetch(id)) ||
         this.client.users.cache.get(id) ||
         this.client.users.cache.find(
            (i) => i.username === username
         );

      return user;
   }
   public async getMember(
      interaction: CommandInteraction,
      id?: Snowflake,
      username?: string
   ): Promise<GuildMember> {
      const member: GuildMember =
         interaction.guild.members.resolve(id) ||
         interaction.guild.members.cache.get(id) ||
         interaction.guild.members.cache.find(
            (i) => i.user.username === username
         );
      return member;
   }
   public async checkRolePosition(
      member: GuildMember,
      target: GuildMember
   ): Promise<boolean | 'same'> {
      if (
         member.roles.highest.position >
         target.roles.highest.position
      )
         return true;
      else if (
         target.roles.highest.position >
         member.roles.highest.position
      )
         return false;
      else if (
         target.roles.highest.position ==
         member.roles.highest.position
      )
         return 'same';
   }
   public parseMentions(mention: string): Snowflake {
      const match = mention.match(/^<@!?(\d+)>$/);
      if (!match) return;
      const id: Snowflake = match[1] as Snowflake;
      return id;
   }
   public async embed({
      fields,
      name,
      value,
      inline,
      authorName,
      authorIcon,
      color,
      desc,
      footer,
      image,
      thumbnail,
      timestamp,
      title,
      url
   }: Partial<Readonly<EmbedData>>): Promise<MessageEmbed> {
      const EmbedGenerator = new MessageEmbed();
      fields ? EmbedGenerator.addFields(fields) : null;
      (name && value) || (name && value && inline)
         ? EmbedGenerator.addField(name, value, inline)
         : null;
      authorName && authorIcon
         ? EmbedGenerator.setAuthor(authorName, authorIcon)
         : null;
      color ? EmbedGenerator.setColor(color) : null;
      desc ? EmbedGenerator.setDescription(desc) : null;
      footer
         ? EmbedGenerator.setFooter(
              footer.text,
              footer.iconURL
           )
         : null;
      image ? EmbedGenerator.setImage(image) : null;
      thumbnail
         ? EmbedGenerator.setThumbnail(thumbnail)
         : null;
      timestamp ? EmbedGenerator.setTimestamp() : null;
      title ? EmbedGenerator.setTitle(title) : null;
      url ? EmbedGenerator.setURL(url) : null;
      return EmbedGenerator;
   }
   public codeblock(
      text: string | number,
      lang?: string
   ): string {
      return `\`\`\`${lang}\n${text}\`\`\``;
   }
   public oneblock(text: string | number | void): string {
      return `\`${text}\``;
   }
   public randomString(length: number): string {
      let result = '';
      const chars =
         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const len = chars.length;
      for (let i = 0; i < length; i++) {
         result += chars.charAt(
            Math.floor(Math.random() * len)
         );
      }
      return result;
   }
}
