import {
   MessageActionRow,
   MessageButton
} from 'discord.js';
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
         usage: '/ticket',
         slashCommandOptions: {
            name: 'ticket',
            description: 'Create a new ticket.'
         },
         run: async (client, interaction) => {
            const chooseButtons =
               new MessageActionRow().addComponents(
                  new MessageButton()
                     .setCustomId('ticket-open')
                     .setLabel('Open ticket')
                     .setEmoji('✅')
                     .setStyle('SUCCESS')
               );
            await interaction.reply({
               components: [chooseButtons],
               embeds: [
                  await client.util.embed({
                     timestamp: true,
                     color: 'NAVY',
                     desc: `To open a ticket, click the button down below.`,
                     authorName: interaction.user.tag,
                     authorIcon:
                        interaction.user.displayAvatarURL(),
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
