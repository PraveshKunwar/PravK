import {
  ColorResolvable,
  EmbedFieldData,
  FileOptions,
  MessageAttachment,
  MessageEmbed,
} from "discord.js";

export interface EmbedData {
  fields: EmbedFieldData;
  name: string;
  value: string;
  inline?: boolean;
  files: Array<FileOptions | string | MessageAttachment>;
  authorName: string;
  icon: string;
  authorUrl: string;
  color: ColorResolvable;
  desc: string;
  footer: {
    text: string;
    iconURL: string;
  };
  image: string;
  thumbnail: string;
  timestamp: Date | number;
  title: string;
  url: string;
}

export const embed = ({
  fields,
  name,
  value,
  inline,
  files,
  authorName,
  icon,
  authorUrl,
  color,
  desc,
  footer,
  image,
  thumbnail,
  timestamp,
  title,
  url,
}: Partial<Readonly<EmbedData>>): MessageEmbed => {
  const EmbedGenerator = new MessageEmbed();
  fields ? EmbedGenerator.addFields(fields) : null;
  (name && value) || (name && value && inline)
    ? EmbedGenerator.addField(name, value, inline)
    : null;
  authorName && icon && authorUrl
    ? EmbedGenerator.setAuthor(authorName, icon, authorUrl)
    : null;
  color ? EmbedGenerator.setColor(color) : null;
  desc ? EmbedGenerator.setDescription(desc) : null;
  footer ? EmbedGenerator.setFooter(footer.text, footer.iconURL) : null;
  image ? EmbedGenerator.setImage(image) : null;
  thumbnail ? EmbedGenerator.setThumbnail(thumbnail) : null;
  timestamp ? EmbedGenerator.setTimestamp(timestamp) : null;
  title ? EmbedGenerator.setTitle(title) : null;
  url ? EmbedGenerator.setURL(url) : null;
  return EmbedGenerator;
};
