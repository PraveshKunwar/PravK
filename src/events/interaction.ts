import { Interaction } from 'discord.js';
import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (
   client,
   interaction: Interaction
) => {
   if (interaction.isButton()) {
      if (interaction.customID === 'ticket-close') {
         if (interaction.channel.isText()) {
            await client.TicketHandler.deleteTicketSession(
               interaction
            );
         }
      } else if (interaction.customID === 'ticket-save') {
         interaction.reply('saving');
         //some thing here
      } else if (interaction.customID === 'ticket-lock') {
         interaction.reply('locking');
      }
   }
};

export const name = 'interaction';
