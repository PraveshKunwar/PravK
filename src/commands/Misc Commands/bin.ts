import sourcebin from 'sourcebin';
import { ERROR } from '../../typedefs/constants';
import { Winbi } from '../../client';
import { Command } from '../../handlers/CmdEvtHandler';

export default class Bin extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'bin',
         aliases: ['sourcebin', 'code'],
         desc: 'Upload code to sourcebin easily.',
         perms: ['SEND_MESSAGES'],
         cooldown: 10,
         category: 'misc',
         usage: '/bin <source code>',
         slashCommandOptions: {
            name: 'bin',
            description: 'Create a new bin.',
            options: [
               {
                  name: 'code',
                  type: 'STRING',
                  description: 'Code to upload to the bin.',
                  required: true
               }
            ]
         },
         run: async (client, interaction, args) => {
            const [code] = args;
            if (!code) {
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
                  const bin = await sourcebin.create(
                     [
                        {
                           content: code as string,
                           language: 'text'
                        }
                     ],
                     {
                        title: `${interaction.user.tag}'s bin.`,
                        description: `${interaction.user.tag}'s code. Check it out.`
                     }
                  );

                  interaction.channel.send({
                     embeds: [
                        await client.util.embed({
                           timestamp: true,
                           color: 'NAVY',
                           desc: `Here is your url: ${bin.url}`,
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
               } catch (e) {
                  if (e) {
                     interaction.reply({
                        ephemeral: true,
                        embeds: [
                           await client.util.embed({
                              desc: ERROR.UNKNOWN,
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
