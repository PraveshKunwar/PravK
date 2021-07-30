import { Interaction } from 'discord.js';
import { Winbi } from '../client';
import { Event } from '../handlers/CmdEvtHandler';

export default class InteractionEvent extends Event {
   public constructor(client: Winbi) {
      super(client, {
         name: 'interaction',
         run: async (client, interaction: Interaction) => {
            if (interaction.isButton()) {
               if (
                  interaction.customID === 'ticket-close'
               ) {
                  if (interaction.channel.isText()) {
                     await client.TicketHandler.deleteTicketSession(
                        interaction
                     );
                  }
               }
               switch (interaction.customID) {
                  case 'ticket-close':
                     if (interaction.channel.isText()) {
                        await client.TicketHandler.deleteTicketSession(
                           interaction
                        );
                     }
                     break;
               }
            }
         }
      });
   }
}
