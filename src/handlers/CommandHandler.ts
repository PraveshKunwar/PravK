import { Client, PermissionString } from 'discord.js';
import {
   categories,
   CommandFunc,
   CommandStruct
} from '../typedefs/types';

export default class Command {
   public client: Client;
   public name?: string;
   public run?: CommandFunc;
   public aliases?: string[];
   public desc?: string;
   public perms?: PermissionString[] | null;
   public cooldown?: number;
   public category?: categories;
   public usage?: string | string[];
   public constructor(
      client: Client,
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
   }
}
