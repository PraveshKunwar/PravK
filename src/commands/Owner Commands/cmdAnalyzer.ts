import { CommandFunc } from "../../typedefs/commandEvent";
import { ERROR } from "../../typedefs/constants";
import { cmdAnalyzer } from "../../handlers/CmdAnalyzer";
import { MessageEmbed, Util } from "discord.js";
import moment from "moment";

export const run: CommandFunc = async (client, message, args) => {
  if (message.author.id !== "391364111331622912") {
    message.channel.send(ERROR.NOT_OWNER);
  } else {
    try {
      const cmd = args.join(" ");
      if (!cmd) {
        message.channel.send(ERROR.NO_ARGS);
      } else if (cmd) {
        const fileContent = await cmdAnalyzer({ path: cmd });
        const ContentEmbed = new MessageEmbed().setColor("#333").addField(
          "Stats",
          `
        Storage space: **${(fileContent.stats.size / (1024 * 1024)).toFixed(
          3
        )}mb**
        Created At: **${moment(fileContent.stats.birthtime).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}**
        File?: **${fileContent.stats.isFile()}**
        `,
          true
        );
        if (fileContent.file.length > 2048) {
          const splitCmd = Util.splitMessage(fileContent.file, {
            maxLength: 512,
            char: "\n",
            prepend: "",
            append: "",
          });
          ContentEmbed.setDescription(
            `\`\`\`ts\n${splitCmd.shift()}\`\`\`\n\n`
          );
          splitCmd.forEach((i) =>
            ContentEmbed.addField("\u200B", `\`\`\`ts\n${i}\`\`\``)
          );
        } else {
          ContentEmbed.setDescription(`\`\`\`ts\n${fileContent}\`\`\``);
        }
        message.channel.send({ embeds: [ContentEmbed] });
      }
    } catch (e) {
      message.channel.send(ERROR.UNKNOWN);
    }
  }
};

export const name: string = "cmd";
export const aliases: string[] = ["cmdyzer", "cmd-analyzer"];
export const desc: string = "Upload code to sourcebin easily.";
export const perms: string | string[] | null = null;
