import { Message } from "discord.js";
import { CommandStruct, EventFunc } from "../typedefs/commandEvent";
export const run: EventFunc = async (client, message: Message) => {
  const prefix = ".";
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
  if (!command || !command.run) return;
  else {
    command.run(client, message, args);
  }
};

export const name: string = "message";
