import {
   ApplicationCommandData,
   PermissionString
} from 'discord.js';
import { PravK } from '../client';
import {
   categories,
   CommandFunc,
   CommandStruct,
   EventFunc,
   EventStruct,
   sealClass
} from '../typedefs/types';

@sealClass
export class Command {
   public client: PravK;
   public name?: string;
   public run?: CommandFunc;
   public aliases?: string[];
   public desc?: string;
   public perms?: PermissionString[] | null;
   public cooldown?: number;
   public category?: categories;
   public usage?: string | string[];
   public slashCommandOptions: ApplicationCommandData;
   public constructor(
      client: PravK,
      options: CommandStruct
   ) {
      this.client = client;
      this.name = options.name;
      this.run = options.run;
      this.aliases = options.aliases;
      this.desc = options.desc;
      this.perms = options.perms;
      this.cooldown = options.cooldown;
      this.category = options.category;
      this.usage = options.usage;
      this.slashCommandOptions =
         options.slashCommandOptions;
   }
}

@sealClass
export class Event {
   public client: PravK;
   public name: string;
   public run: EventFunc;
   public constructor(client: PravK, options: EventStruct) {
      this.client = client;
      this.name = options.name;
      this.run = options.run;
   }
}
