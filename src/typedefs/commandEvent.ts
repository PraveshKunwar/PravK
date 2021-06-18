import { Message } from "discord.js";
import { Winbi } from "../client";

export interface CommandFunc {
  (
    client: Winbi,
    message: Message,
    args: string | string[]
  ): void | Promise<unknown>;
}

export interface EventFunc {
  (client: Winbi, ...args: unknown[]): Promise<unknown>;
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
