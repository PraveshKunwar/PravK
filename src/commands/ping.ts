import { CommandFunc } from "../typedefs/commandEvent";

export const run: CommandFunc = async (client, message, args) => {
  return message.channel.send("Hello world.");
};

export const name: string = "ping";
export const aliases: string | string[] = ["pong"];
export const desc: string = "A simple ping command.";
export const perms: string | string[] | null = null;
