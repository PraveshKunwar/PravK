import { Message } from "discord.js";
import { Winbi } from "../client";

export interface CommandFunc {
  (client: Winbi, message: Message, args: string[]):
    | void
    | Promise<unknown>
    | Promise<void>;
}

export interface EventFunc {
  (client: Winbi, ...args: any[]): void | Promise<unknown> | Promise<void>;
}

export type categories = "owner" | "misc" | "information" | "moderation";

export interface CommandStruct {
  name?: string;
  run?: CommandFunc;
  aliases?: string[];
  desc?: string;
  perms?: string | string[] | null;
  cooldown?: number;
  category?: categories;
}

export interface EventStruct {
  name?: string;
  run?: EventFunc;
}
