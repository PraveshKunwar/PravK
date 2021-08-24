import { inspect } from 'util';
import { ERROR } from '../../typedefs/constants';
import * as ts from 'typescript';
import { Command } from '../../handlers/CmdEvtHandler';
import { PravK } from '../../client';
import { GuildMember } from 'discord.js';

export default class Eval extends Command {
   public constructor(client: PravK) {
      super(client, {
         name: 'eval',
         aliases: ['e', 'evaluate'],
         desc: 'Evaluate anything.',
         perms: ['SEND_MESSAGES'],
         cooldown: 5,
         category: 'owner',
         slashCommandOptions: {
            name: 'eval',
            description: 'Evaluate anything.',
            options: [
               {
                  name: 'evaluation',
                  type: 'STRING',
                  description: 'Thing to evaluate.',
                  required: true
               }
            ]
         },
         run: async (client, interaction, args) => {
            const [evaluation] = args;
            if (!evaluation)
               return interaction.reply({
                  ephemeral: true,
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.NO_ARGS,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });

            let evaled;
            const start = process.hrtime();
            const stop = process.hrtime(start);
            const prRegex = new RegExp(/process/gi);
            const tokenRegex = new RegExp(/token/gi);
            if (
               prRegex.test(evaluation as string) === true
            ) {
               return interaction.reply({
                  ephemeral: true,
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.PROCESS,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            }
            if (
               tokenRegex.test(evaluation as string) ===
               true
            ) {
               return interaction.reply({
                  ephemeral: true,
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.TOKEN,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            }
            if (
               evaluation &&
               (interaction.member as GuildMember).id ===
                  '391364111331622912'
            ) {
               try {
                  evaled = eval(
                     ts.transpile(evaluation as string)
                  );
                  const result = `\`\`\`ts\n${inspect(
                     evaled,
                     {
                        depth: 0
                     }
                  )}\`\`\``;
                  const taken = `\`\`\`ts\n${
                     (stop[0] * 1e9 + stop[1]) / 1e6
                  }ms taken!\`\`\``;
                  interaction.reply({
                     embeds: [
                        await client.util.embed({
                           timestamp: true,
                           footer: {
                              text: `PravK Bot • Created By PraveshK`,
                              iconURL:
                                 client.user.displayAvatarURL()
                           },
                           authorName: interaction.user.tag,
                           authorIcon:
                              interaction.user.displayAvatarURL(),
                           desc: `	**Result:**\n${result}\n**Time Taken:**\n${taken}`,
                           color: 'NAVY'
                        })
                     ]
                  });
               } catch (e) {
                  if (e) {
                     interaction.reply({
                        ephemeral: true,
                        embeds: [
                           await client.util.embed({
                              desc: `❯ ${e}`,
                              color: 'RED',
                              footer: {
                                 text: '\u3000'.repeat(10)
                              }
                           })
                        ]
                     });
                  }
               }
            }
         }
      });
   }
}
