import {
   Client,
   Collection,
   Intents,
   Snowflake
} from 'discord.js';
import glob from 'glob';
import { Pattern } from './typedefs/pattern';
import { codeblock, oneblock } from './lib/codeblock';
import {
   CommandStruct,
   EventStruct
} from './typedefs/commandEvent';
import { DBHandler } from './handlers/DBHandler';

class Winbi extends Client {
   public constructor() {
      super({
         intents: Intents.ALL,
         partials: [
            'MESSAGE',
            'GUILD_MEMBER',
            'REACTION',
            'USER',
            'CHANNEL'
         ],
         retryLimit: Number.POSITIVE_INFINITY
      });
   }
   public commands: Collection<string, CommandStruct> =
      new Collection<string, CommandStruct>();
   public events: Collection<string, EventStruct> =
      new Collection<string, EventStruct>();
   public aliases: Collection<string, CommandStruct> =
      new Collection<string, CommandStruct>();
   public cooldowns: Collection<
      string,
      Collection<Snowflake, number>
   > = new Collection<
      string,
      Collection<Snowflake, number>
   >();
   public codeblock = codeblock;
   public oneblock = oneblock;
   public DBHandler = DBHandler;
   public async cmdEvtHandler({
      CmdPattern,
      EvtPattern
   }: Partial<
      Readonly<Pick<Pattern, 'CmdPattern' | 'EvtPattern'>>
   >): Promise<void> {
      glob(
         CmdPattern as string,
         (err: Error, cmdFiles: string[]) => {
            if (err) return console.error(err);
            cmdFiles.map(async (file: string) => {
               if (
                  file.endsWith('.js') ||
                  file.match(/.*\.js$/)
               ) {
                  const cmd: Required<
                     Readonly<CommandStruct>
                  > = (await import(file)) as Required<
                     Readonly<CommandStruct>
                  >;
                  this.commands.set(cmd.name, cmd);
                  if (cmd.aliases) {
                     cmd.aliases.map((alias: string) => {
                        this.aliases.set(alias, cmd);
                     });
                  }
               }
            });
         }
      );
      glob(
         EvtPattern as string,
         (err: Error, evtFiles: string[]) => {
            if (err) return console.error(err);
            evtFiles.map(async (file: string) => {
               if (
                  file.endsWith('.js') ||
                  file.match(/.*\.js$/)
               ) {
                  const evt: Required<
                     Readonly<EventStruct>
                  > = (await import(file)) as Required<
                     Readonly<EventStruct>
                  >;
                  this.events.set(evt.name, evt);
                  this.on(
                     evt.name,
                     evt.run.bind(null, this)
                  );
               }
            });
         }
      );
   }

   public async start(token: string): Promise<void> {
      if (this instanceof Client && token) {
         this.login(token);
         this.DBHandler();
         this.cmdEvtHandler({
            CmdPattern: `${__dirname}/commands/**/*{.js,.ts}`,
            EvtPattern: `${__dirname}/events/**/*{.js,.ts}`
         });
      }
   }
}

export { Winbi };
