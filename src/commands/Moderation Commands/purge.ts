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
         usage: '/purge <number less than 100>',
         slashCommandOptions: {
            name: 'purge',
            description:
               'Purge any amount of messages, up to 100.',
            options: [
               {
                  name: 'amount',
                  type: 'NUMBER',
                  description:
                     'Amount of messages to delete.',
                  required: true
               }
            ]
         },

         run: async (client, interaction, args) => {
            const [toDeleteMsgs] = args;
            if (
               !toDeleteMsgs ||
               isNaN(toDeleteMsgs as number) ||
               toDeleteMsgs > 100
            ) {
               return interaction.reply({
                  ephemeral: true,
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
               return interaction.reply({
                  ephemeral: true,
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
                  .bulkDelete(
                     parseInt(toDeleteMsgs as string),
                     true
                  )
                  .then(async () => {
                     return interaction.reply({
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
                     return interaction.reply({
                        ephemeral: true,
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
