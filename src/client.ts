import {
   ApplicationCommandData,
   Client,
   ClientEvents,
   Collection,
   Snowflake
} from 'discord.js';
import glob from 'glob';
import DBHandler from './handlers/DBHandler';
import MusicHandler from './handlers/MusicHandler';
import TicketHandler from './handlers/TicketHandler';
import dotenv from 'dotenv';
import {
   CommandStruct,
   EventStruct,
   Pattern
} from './typedefs/types';
import Utility from './lib/util';
import consola, { Consola } from 'consola';
import ReminderSession from './helpers/Helper';
import { Command } from './handlers/CmdEvtHandler';
import validator from 'validator';
import { REST } from '@discordjs/rest';

dotenv.config();

class PravK extends Client<true> {
   public slashCommands: ApplicationCommandData[] = [];
   public rest_v9: REST;
   public validate: typeof validator;
   public util: Utility;
   public DBHandler: DBHandler;
   public MusicHandler: MusicHandler;
   public TicketHandler: TicketHandler;
   public Reminder: ReminderSession;
   public logger: Consola;
   public commands: Collection<string, CommandStruct>;
   public events: Collection<string, EventStruct>;
   public aliases: Collection<string, CommandStruct>;
   public cooldowns: Collection<
      string,
      Collection<Snowflake, number>
   >;
   public constructor(token?: string) {
      super({
         allowedMentions: {
            users: [
               '391364111331622912',
               '854045285611995167'
            ]
         },
         intents: [
            'DIRECT_MESSAGES',
            'GUILDS',
            'GUILD_BANS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
            'GUILD_PRESENCES'
         ],
         partials: [
            'MESSAGE',
            'GUILD_MEMBER',
            'REACTION',
            'USER',
            'CHANNEL'
         ],
         retryLimit: Number.POSITIVE_INFINITY
      });
      this.util = new Utility(this);
      this.DBHandler = new DBHandler(this);
      this.MusicHandler = new MusicHandler(this);
      this.TicketHandler = new TicketHandler(this);
      this.Reminder = new ReminderSession(this);
      this.commands = new Collection();
      this.events = new Collection();
      this.aliases = new Collection();
      this.cooldowns = new Collection();
      this.logger = consola;
      this.rest_v9 = new REST({ version: '9' }).setToken(
         token
      );
      process.on('uncaughtException', (err) => {
         this.logger.error(new Error(err.message));
      });
      process.on('exit', (exit) => {
         this.logger.error(
            new Error(`Exited with code: ${exit}`)
         );
      });
   }
   public async cmdEvtHandler({
      CmdPattern,
      EvtPattern
   }: Partial<
      Readonly<Pick<Pattern, 'CmdPattern' | 'EvtPattern'>>
   >): Promise<void> {
      glob(CmdPattern, (err: Error, cmdFiles: string[]) => {
         if (err)
            return this.logger.error(
               new Error(err.message)
            );
         cmdFiles.map(async (file: string) => {
            if (
               file.endsWith('.js') ||
               file.match(/.*\.js$/)
            ) {
               const cmd: Required<Readonly<Command>> =
                  new (await import(file)).default(
                     this
                  ) as Required<Readonly<Command>>;
               this.commands.set(cmd.name, cmd);
               if (cmd.slashCommandOptions) {
                  this.slashCommands.push(
                     cmd.slashCommandOptions
                  );
               }
               if (cmd.aliases) {
                  cmd.aliases.map((alias: string) => {
                     this.aliases.set(alias, cmd);
                  });
               }
            }
         });
      });
      glob(EvtPattern, (err: Error, evtFiles: string[]) => {
         if (err)
            return this.logger.error(
               new Error(err.message)
            );
         evtFiles.map(async (file: string) => {
            if (
               file.endsWith('.js') ||
               file.match(/.*\.js$/)
            ) {
               const evt: Required<Readonly<EventStruct>> =
                  new (await import(file)).default(
                     this
                  ) as Required<Readonly<EventStruct>>;
               this.events.set(evt.name, evt);
               this.on(
                  evt.name as keyof ClientEvents,
                  evt.run.bind(null, this)
               );
            }
         });
      });
   }

   public async start(token: string): Promise<void> {
      if (token) {
         this.login(token);
         this.DBHandler.connect(process.env.MONGO_URI);
         this.cmdEvtHandler({
            CmdPattern: `${__dirname}/commands/**/*{.js,.ts}`,
            EvtPattern: `${__dirname}/events/**/*{.js,.ts}`
         }).then(() => {
            this.logger.success(
               'Commands and events have been loaded.'
            );
         });
      }
   }
}

export { PravK };
