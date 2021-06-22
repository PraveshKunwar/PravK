import { CommandFunc } from "../../typedefs/commandEvent";

export const run: CommandFunc = async (client, message, args) => {
  message.channel.send("Help is on the way.");
};

export const name: string = "help";
export const desc: string =
  "Help command to get info on commands or specific command.";
export const perms: string | string[] | null = null;
export const cooldown: number = 20;
