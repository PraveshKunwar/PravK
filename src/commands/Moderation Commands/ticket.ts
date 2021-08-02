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
            await client.TicketHandler.createTicketSession(
               interaction
            ).then(async (channel) => {
               return interaction.reply({
                  ephemeral: true,
                  embeds: [
                     await client.util.embed({
                        desc: `Created a new ticket: ${channel.name}`,
                        color: 'NAVY',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            });
         }
      });
   }
}
