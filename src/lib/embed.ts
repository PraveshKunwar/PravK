import {
  EmbedFieldData,
  FileOptions,
  MessageAttachment,
  MessageEmbed,
} from "discord.js";

type ColorResolvable =
  | "DEFAULT"
  | "WHITE"
  | "AQUA"
  | "GREEN"
  | "BLUE"
  | "YELLOW"
  | "PURPLE"
  | "LUMINOUS_VIVID_PINK"
  | "FUCHSIA"
  | "GOLD"
  | "ORANGE"
  | "RED"
  | "GREY"
  | "DARKER_GREY"
  | "NAVY"
  | "DARK_AQUA"
  | "DARK_GREEN"
  | "DARK_BLUE"
  | "DARK_PURPLE"
  | "DARK_VIVID_PINK"
  | "DARK_GOLD"
  | "DARK_ORANGE"
  | "DARK_RED"
  | "DARK_GREY"
  | "LIGHT_GREY"
  | "DARK_NAVY"
  | "BLURPLE"
  | "GREYPLE"
  | "DARK_BUT_NOT_BLACK"
  | "NOT_QUITE_BLACK"
  | "RANDOM";

export interface EmbedData {
  fields: Required<EmbedFieldData[]>;
  name: string;
  value: string;
  inline?: boolean;
  files: Array<FileOptions | string | MessageAttachment>;
  authorName: string;
  authorIcon: string;
  color: ColorResolvable | string;
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

export const embed = ({
  fields,
  name,
  value,
  inline,
  files,
  authorName,
  authorIcon,
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
  authorName && authorIcon
    ? EmbedGenerator.setAuthor(authorName, authorIcon)
    : null;
  color ? EmbedGenerator.setColor(color) : null;
  desc ? EmbedGenerator.setDescription(desc) : null;
  footer ? EmbedGenerator.setFooter(footer.text, footer.iconURL) : null;
  image ? EmbedGenerator.setImage(image) : null;
  thumbnail ? EmbedGenerator.setThumbnail(thumbnail) : null;
  timestamp ? EmbedGenerator.setTimestamp() : null;
  title ? EmbedGenerator.setTitle(title) : null;
  url ? EmbedGenerator.setURL(url) : null;
  return EmbedGenerator;
};
