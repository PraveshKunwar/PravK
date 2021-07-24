import {
   Client,
   GuildChannel,
   GuildMember,
   Message,
   Snowflake,
   User,
   EmbedFieldData,
   FileOptions,
   MessageAttachment,
   MessageEmbed,
   ThreadChannel
} from 'discord.js';

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

type Channels =
   | 'text'
   | 'voice'
   | 'category'
   | 'news'
   | 'store'
   | 'stage';

export default class Utility {
   public async getChannel(
      message: Message,
      id?: Snowflake,
      type?: Channels,
      name?: string
   ): Promise<GuildChannel | ThreadChannel> {
      const channel: GuildChannel | ThreadChannel = id
         ? await message.guild.channels.fetch(id)
         : message.guild.channels.cache.find(
              (i) => i.name === name && i.type === type
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
