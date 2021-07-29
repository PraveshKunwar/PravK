import { Message, Snowflake } from 'discord.js';
import { Winbi } from '../client';
import { ReminderOptions } from '../typedefs/types';

export default class ReminderSession {
   public readonly client: Winbi;
   public time: string | number | Date;
   public id: Snowflake;
   public constructor(
      client: Winbi,
      options?: ReminderOptions
   ) {
      this.client = client;
      if (options) {
         this.time = options.time;
         this.id = options.id;
      }
   }
   public async schedule(
      period: string | number | Date
   ): Promise<void> {
      const thing = period;
      console.log(thing);
   }
   public async setSession(
      message: Message
   ): Promise<void> {
      message.channel.send({
         embeds: [
            await this.client.util.embed({
               desc: `✅ Successfully set new reminder.`,
               color: 'RED',
               footer: {
                  text: '\u3000'.repeat(10)
               }
            })
         ]
      });
   }
   public async loadHelperSession(): Promise<void> {
      this.client.logger.success(
         'Loaded all reminder sessions.'
      );
   }
}
