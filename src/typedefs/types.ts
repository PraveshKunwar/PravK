import {
   ApplicationCommandData,
   ApplicationCommandOption,
   ClientEvents,
   CommandInteraction,
   PermissionString,
   Snowflake
} from 'discord.js';
import { Winbi } from '../client';

export interface JokeResponse {
   id: number;
   type: string;
   setup: string;
   punchline: string;
}

export interface QuoteResponse {
   _id: string;
   tags: string[];
   content: string;
   author: string;
   authorSlug: string;
   datedAdded: string;
   dateModified: string;
}

export interface ReminderOptions {
   time?: number | Date | string;
   id?: Snowflake;
}

export interface CommandFunc {
   (
      client: Winbi,
      interaction: CommandInteraction,
      args: (string | number | boolean)[]
   ): void | Promise<unknown> | Promise<void>;
}

export interface EventFunc {
   (client: Winbi, ...args: unknown[]):
      | void
      | Promise<unknown>
      | Promise<void>;
}

export type categories =
   | 'owner'
   | 'misc'
   | 'information'
   | 'moderation'
   | 'currency'
   | 'music';

export interface CommandStruct {
   name?: string;
   run?: CommandFunc;
   aliases?: string[];
   desc?: string;
   perms?: PermissionString[] | null;
   cooldown?: number;
   category?: categories;
   usage?: string | string[];
   slashCommandOptions?: ISlashCommand;
}

export interface ISlashCommand
   extends ApplicationCommandData {
   name: string;
   description: string;
   options?: ApplicationCommandOption[];
}

export interface EventStruct {
   name?: keyof ClientEvents | string;
   run?: EventFunc;
}

export interface Pattern {
   CmdPattern: string;
   EvtPattern: string;
   OtherPattern: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function sealClass(constructor: Function): void {
   Object.seal(constructor);
   Object.seal(constructor.prototype);
}
