import { Message } from "discord.js";
import { Winbi } from "src/client/client";

export interface CommandFunc {
  (client: Winbi, message: Message, args: string | string[]): Promise<unknown>;
}

export interface EventFunc {
  (client: Winbi, ...args: unknown[]): Promise<unknown>;
}

export interface CommandStruct {
  name: string;
  aliases: string | string[];
  desc: string;
  perms: string | string[];
}
