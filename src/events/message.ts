import {
  ApplicationCommandData,
  Collection,
  DiscordAPIError,
  Message,
  Snowflake,
} from "discord.js";
import { embed } from "../lib/embed";
import { CommandStruct, EventFunc } from "../typedefs/commandEvent";
import { ERROR } from "../typedefs/constants";
export const run: EventFunc = async (client, message: Message) => {
  const prefix = ".";
  const cooldowns = client.cooldowns;

  if (
    message.author.bot ||
    !message.guild ||
    !message.content.startsWith(prefix)
  )
    return;

  const args: string[] | any[] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd: string = args.shift();
  const command: CommandStruct =
    client.commands.get(cmd) || client.aliases.get(cmd);
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection<Snowflake, number>());
  }
  const current: number = Date.now();
  const time = cooldowns.get(command.name);
  const amount = command.cooldown * 1000;
  if (time.has(message.author.id)) {
    const expiresIn = time.get(message.author.id) + amount;
    if (current < expiresIn) {
      const timeRemaining = (expiresIn - current) / 1000;
      return message.channel.send({
        embeds: [
          embed({
            desc: `⌚ Please wait **${timeRemaining.toFixed(
              2
            )}** seconds before using the **${command.name}** command.`,
            color: "RED",
            footer: {
              text: "\u3000".repeat(10),
            },
          }),
        ],
      });
    }
  }
  time.set(message.author.id, current);
  setTimeout(() => time.delete(message.author.id), amount);
  if (!command || !command.run) return;
  else {
    command.run(client, message, args);
  }
};

export const name: string = "message";
