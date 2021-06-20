import { CommandFunc } from "../../typedefs/commandEvent";
import { ERROR } from "../../typedefs/constants";
import { cmdAnalyzer } from "../../handlers/CmdAnalyzer";
import { MessageEmbed, Util } from "discord.js";

export const run: CommandFunc = async (client, message, args) => {
  if (message.author.id !== "391364111331622912") {
    message.channel.send(ERROR.NOT_OWNER);
  } else {
    try {
      const cmd = args.join(" ");
      const fileContent = await cmdAnalyzer({ path: cmd });
      const Content = new MessageEmbed().setColor("#333");
      if (fileContent.length > 2048) {
        const splitCmd = Util.splitMessage(fileContent, {
          maxLength: 512,
          char: "\n",
          prepend: "",
          append: "",
        });
        Content.setDescription(`\`\`\`ts\n${splitCmd.shift()}\`\`\``);
        splitCmd.forEach((i) =>
          Content.addField("\u200B", `\`\`\`ts\n${i}\`\`\``)
        );
      } else {
        Content.setDescription(`\`\`\`ts\n${fileContent}\`\`\``);
      }
      message.channel.send({ embeds: [Content] });
    } catch (e) {
      message.channel.send(ERROR.UNKNOWN);
    }
  }
};

export const name: string = "cmd-analyzer";
export const aliases: string[] = ["cmdyzer", "cmd"];
export const desc: string = "Upload code to sourcebin easily.";
export const perms: string | string[] | null = null;
