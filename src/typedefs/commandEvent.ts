import { Message, PermissionString } from 'discord.js';
import { Winbi } from '../client';

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
