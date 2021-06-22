import { DMChannel, NewsChannel, TextChannel, User } from "discord.js";
import { EventFunc } from "../typedefs/commandEvent";

export const run: EventFunc = async (
  client,
  channel: TextChannel | DMChannel | NewsChannel,
  user: User
) => {
  console.log(`User has been typing for: ${user.typingDurationIn}ms`);
};

export const name: string = "typingStart";
