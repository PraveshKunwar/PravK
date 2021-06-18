import { Message } from "discord.js";
import { Winbi } from "../client";

export interface CommandFunc {
  (client: Winbi, message: Message, args: string | string[]):
    | void
    | Promise<unknown>
    | Promise<void>;
}

export interface EventFunc {
  (client: Winbi, ...args: any[]): void | Promise<unknown> | Promise<void>;
}

export interface CommandStruct {
  name: string;
  run: CommandFunc;
  aliases: string | string[];
  desc: string;
  perms: string | string[] | null;
}

export interface EventStruct {
  name: string;
  run: EventFunc;
}
