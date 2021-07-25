import {
   Message,
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

export interface HelperOptions {
   time?: number | Date | string;
   id?: Snowflake;
}

export interface CommandFunc {
   (client: Winbi, message: Message, args: string[]):
      | void
      | Promise<unknown>
      | Promise<void>;
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
   | 'currency';

export interface CommandStruct {
   name?: string;
   run?: CommandFunc;
   aliases?: string[];
   desc?: string;
   perms?: PermissionString[] | null;
   cooldown?: number;
   category?: categories;
   usage?: string | string[];
}

export interface EventStruct {
   name?: string;
   run?: EventFunc;
}

export interface Pattern {
   CmdPattern: string;
   EvtPattern: string;
   OtherPattern: string;
}
