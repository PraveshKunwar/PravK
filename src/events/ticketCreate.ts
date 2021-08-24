import {
   CommandInteraction,
   MessageActionRow,
   MessageButton,
   TextChannel
} from 'discord.js';
import { PravK } from '../client';
import { Event } from '../handlers/CmdEvtHandler';

export default class TicketCreate extends Event {
   public constructor(client: PravK) {
      super(client, {
         name: 'ticketCreate',
         run: async (
            client,
            interaction: CommandInteraction,
            channel: TextChannel
         ) => {
            const ticketButtons =
               new MessageActionRow().addComponents(
                  new MessageButton()
                     .setCustomId('ticket-close')
                     .setLabel('Close ticket')
                     .setEmoji('❌')
                     .setStyle('DANGER'),
                  new MessageButton()
                     .setCustomId('ticket-save')
                     .setLabel('Save ticket transcript')
                     .setEmoji('✉')
                     .setStyle('PRIMARY'),
                  new MessageButton()
                     .setCustomId('ticket-lock')
                     .setLabel('Lock ticket')
                     .setEmoji('🔒')
                     .setStyle('SECONDARY')
               );
            await channel.send({
               components: [ticketButtons],
               embeds: [
                  await client.util.embed({
                     timestamp: true,
                     color: 'NAVY',
                     desc: `Welcome to the ticket ${interaction.user.tag}. Click one of the buttons below any time. Enjoy!`,
                     authorName: interaction.user.tag,
                     authorIcon:
                        interaction.user.displayAvatarURL(),
                     footer: {
                        text: 'PravK Bot • Created By PraveshK',
                        iconURL:
                           client.user.displayAvatarURL()
                     }
                  })
               ]
            });
         }
      });
   }
}
