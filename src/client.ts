import {
   ApplicationCommand,
   Client,
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
import DisTube from 'distube';

dotenv.config();

class Winbi extends Client {
   public slashCommands: ApplicationCommand[];
   public util: Utility;
   public DisTube: DisTube;
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
   public constructor() {
      super({
         allowedMentions: {
            users: [
               '391364111331622912',
               '854045285611995167'
            ]
         },
         intents: [
            'DIRECT_MESSAGES',
            'DIRECT_MESSAGE_REACTIONS',
            'DIRECT_MESSAGE_TYPING',
            'GUILDS',
            'GUILD_BANS',
            'GUILD_EMOJIS_AND_STICKERS',
            'GUILD_INTEGRATIONS',
            'GUILD_INVITES',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
            'GUILD_MESSAGE_TYPING',
            'GUILD_PRESENCES',
            'GUILD_VOICE_STATES',
            'GUILD_WEBHOOKS'
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
      this.slashCommands = [];
      this.util = new Utility(this);
      this.DisTube = new DisTube(this, {
         emitNewSongOnly: true,
         leaveOnEmpty: true,
         leaveOnFinish: true,
         leaveOnStop: true
      });
      this.DBHandler = new DBHandler(this);
      this.MusicHandler = new MusicHandler(this);
      this.TicketHandler = new TicketHandler(this);
      this.Reminder = new ReminderSession(this);
      this.commands = new Collection();
      this.events = new Collection();
      this.aliases = new Collection();
      this.cooldowns = new Collection();
      this.logger = consola;
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
               const cmd: Required<
                  Readonly<CommandStruct>
               > = new (await import(file)).default(
                  this
               ) as Required<Readonly<CommandStruct>>;
               this.commands.set(cmd.name, cmd);
               this.slashCommands.push(
                  cmd.slashCommandOptions
               );
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
               this.on(evt.name, evt.run.bind(null, this));
            }
         });
      });
   }

   public async start(token: string): Promise<void> {
      if (this instanceof Client && token) {
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

export { Winbi };
