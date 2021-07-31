import { DiscordAPIError, TextChannel } from 'discord.js';
import { ERROR } from '../../typedefs/constants';
import { Command } from '../../handlers/CmdEvtHandler';
import { Winbi } from '../../client';

export default class Purge extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'purge',
         aliases: ['clear'],
         desc: 'Delete x messages.',
         perms: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
         cooldown: 20,
         category: 'moderation',
         usage: '<prefix>purge <number less than 1000>',

         run: async (client, interaction, args) => {
            const toDeleteMsgs = Number(args[0]);
            if (
               !toDeleteMsgs ||
               isNaN(toDeleteMsgs) ||
               toDeleteMsgs > 100
            ) {
               return interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.NO_NUMS,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            } else if (!interaction.channel.messages) {
               return interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.NO_MSGS_TO_DEL,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            } else {
               (interaction.channel as TextChannel)
                  .bulkDelete(toDeleteMsgs, true)
                  .then(async () => {
                     return interaction.channel.send({
                        embeds: [
                           await client.util.embed({
                              desc: `🗑 Deleted ${toDeleteMsgs} messages. `,
                              color: 'NAVY',
                              footer: {
                                 text: '\u3000'.repeat(10)
                              }
                           })
                        ]
                     });
                  })
                  .catch(async (err: DiscordAPIError) => {
                     return interaction.channel.send({
                        embeds: [
                           await client.util.embed({
                              desc: `${ERROR.UNKNOWN} \n\n Discord: ${err.message}`,
                              color: 'NAVY',
                              footer: {
                                 text: '\u3000'.repeat(10)
                              }
                           })
                        ]
                     });
                  });
            }
         }
      });
   }
}
