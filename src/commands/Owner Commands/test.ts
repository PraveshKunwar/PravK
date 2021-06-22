import { CommandFunc } from "../../typedefs/commandEvent";
import { ERROR } from "../../typedefs/constants";

export const test: CommandFunc = async (client, message, args) => {
  if (message.author.id !== "391364111331622912")
    return message.channel.send(ERROR.NOT_OWNER);
  else {
    try {
    } catch (e) {
      message.channel.send(ERROR.UNKNOWN);
    }
  }
};

export const name: string = "test";
export const category: string = "test";
export const desc: string = "Test anything.";
export const perms: string[] = ["BOT_OWNER"];
export const cooldown: number = 5;
