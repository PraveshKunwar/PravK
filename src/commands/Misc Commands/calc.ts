import { ERROR } from '../../typedefs/constants';
import { evaluate } from 'mathjs';
import { Command } from '../../handlers/CmdEvtHandler';
import { Winbi } from '../../client';

export default class Calc extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'calc',
         desc: 'Calculates any mathematical expression.',
         aliases: ['calculate', 'math'],
         perms: ['SEND_MESSAGES'],
         cooldown: 10,
         category: 'misc',
         usage: '/calc <expression>',
         slashCommandOptions: {
            name: 'calc',
            description:
               'Calculates mathematical expression.',
            options: [
               {
                  name: 'expression',
                  type: 'STRING',
                  description: 'Expression to evaluate.',
                  required: true
               }
            ]
         },
         run: async (client, interaction, args) => {
            const [expression] = args;
            if (!expression) {
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
            } else {
               try {
                  const evaluation = evaluate(
                     expression as string
                  );
                  const start = process.hrtime();
                  const stop = process.hrtime(start);
                  const result = `\`\`\`ts\n${evaluation}\`\`\``;
                  const taken = `\`\`\`ts\n${
                     (stop[0] * 1e9 + stop[1]) / 1e6
                  }ms taken!\`\`\``;
                  interaction.channel.send({
                     embeds: [
                        await client.util.embed({
                           timestamp: true,
                           footer: {
                              text: `Winbi Bot • Created By PraveshK`,
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
                  interaction.reply({
                     ephemeral: true,
                     embeds: [
                        await client.util.embed({
                           desc: `❌ Invalid use of command. Check out the link [here](https://mathjs.org/) to see how the library works.`,
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
      });
   }
}
