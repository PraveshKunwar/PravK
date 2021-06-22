import { MessageEmbed } from "discord.js";
import { inspect } from "util";
import { CommandFunc } from "../../typedefs/commandEvent";
import { ERROR } from "../../typedefs/constants";

export const run: CommandFunc = async (client, message, args) => {
  const evaluation = args.join(" ");
  if (message.member?.id !== "391364111331622912")
    return message.channel.send(ERROR.NOT_OWNER);
  if (!evaluation) message.channel.send(ERROR.NO_ARGS);

  let evaled;
  const start = process.hrtime();
  const stop = process.hrtime(start);
  if (evaluation.includes("process") || evaluation.includes("process.exit()")) {
    message.channel.send(ERROR.PROCESS);
  }
  if (evaluation && message.member?.id === "391364111331622912") {
    try {
      evaled = eval(evaluation);
      const result = `\`\`\`ts\n${inspect(evaled, { depth: 0 })}\`\`\``;
      const taken = `\`\`\`ts\n${
        (stop[0] * 1e9 + stop[1]) / 1e6
      }ms taken!}\`\`\``;
      const EvalEmbed = new MessageEmbed()
        .setAuthor(client.user?.tag, client.user?.displayAvatarURL())
        .setDescription(
          `
			**Result:**\n${result}\n**Time Taken:**\n${taken}
			`
        )
        .setColor("#333")
        .setTimestamp()
        .setFooter(
          `User: ${message.author?.tag} • Created by: PraveshK`,
          message.author.displayAvatarURL()
        );
      message.channel.send({ embeds: [EvalEmbed] });
    } catch (e) {
      if (e) {
        const DeletedEmbed = new MessageEmbed()
          .setColor("#333")
          .setDescription(`❯ ${e}`)
          .setFooter("\u3000".repeat(10));
        message.channel
          .send({ embeds: [DeletedEmbed] })
          .then(async (msg) => await msg.delete());
      }
    }
  }
};

export const name: string = "eval";
export const category: string = "owner";
export const aliases: string[] = ["e", "evaluate"];
export const desc: string = "Evaluate string.";
export const perms: string[] = ["BOT_OWNER"];
export const cooldown: number = 5;
