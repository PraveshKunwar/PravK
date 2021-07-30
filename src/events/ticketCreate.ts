import {
   Message,
   MessageActionRow,
   MessageButton,
   TextChannel
} from 'discord.js';
import { Winbi } from '../client';
import { Event } from '../handlers/CmdEvtHandler';

export default class TicketCreate extends Event {
   public constructor(client: Winbi) {
      super(client, {
         name: 'ticketCreate',
         run: async (
            client,
            message: Message,
            channel: TextChannel
         ) => {
            const ticketButtons =
               new MessageActionRow().addComponents(
                  new MessageButton()
                     .setCustomID('ticket-close')
                     .setLabel('Close ticket')
                     .setEmoji('❌')
                     .setStyle('DANGER'),
                  new MessageButton()
                     .setCustomID('ticket-save')
                     .setLabel('Save ticket transcript')
                     .setEmoji('✉')
                     .setStyle('PRIMARY'),
                  new MessageButton()
                     .setCustomID('ticket-lock')
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
                     desc: `Welcome to the ticket ${message.author.tag}. Click one of the buttons below any time. Enjoy!`,
                     authorName: message.author.tag,
                     authorIcon:
                        message.author.displayAvatarURL(),
                     footer: {
                        text: 'Winbi Bot • Created By PraveshK',
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
