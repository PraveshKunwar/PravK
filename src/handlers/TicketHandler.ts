import {
   CategoryChannel,
   Client,
   Message
} from 'discord.js';
import { Winbi } from '../client';

export default class TicketHandler {
   private client: Client;
   public constructor(client: Client) {
      this.client = client;
   }
   public async nameTicketSession(): Promise<string> {
      return `ticket-${(
         this.client as Winbi
      ).util.randomString(4)}`;
   }
   public async createTicketSession(
      message: Message
   ): Promise<void> {
      const categoryChannel: CategoryChannel | undefined =
         (await (this.client as Winbi).util.getChannel(
            message,
            null,
            'category',
            'TexChannels'
         )) as CategoryChannel | undefined;
      console.log(categoryChannel.id);
   }
   public async deleteTicketSession(): Promise<void> {
      console.log(2);
   }
   public async lockTicketSession(): Promise<void> {
      console.log(2);
   }
   public async saveTicketLogs(): Promise<void> {
      console.log(2);
   }
}
