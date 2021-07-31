import { Winbi } from '../../client';
import { Command } from '../../handlers/CmdEvtHandler';

export default class Ticket extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'ticket',
         aliases: ['create-ticket'],
         desc: 'Create a new ticket.',
         perms: ['SEND_MESSAGES', 'MANAGE_CHANNELS'],
         cooldown: 10,
         category: 'moderation',
         usage: '<prefix>ticket',
         run: async (client, interaction) => {
            await client.TicketHandler.createTicketSession(
               interaction
            );
         }
      });
   }
}
