import { DiscordAPIError } from 'discord.js';
import sourcebin from 'sourcebin';
import { ERROR } from '../../typedefs/constants';
import { Winbi } from '../../client';
import Command from '../../handlers/CommandHandler';

export default class Bin extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'bin',
         aliases: ['sourcebin', 'code'],
         desc: 'Upload code to sourcebin easily.',
         perms: ['SEND_MESSAGES'],
         cooldown: 10,
         category: 'misc',
         usage: '<prefix>bin <source code>',
         run: async (client, message, args) => {
            const code = args.join(' ');
            if (!code) {
               return message.channel.send({
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
                           content: code,
                           language: 'text'
                        }
                     ],
                     {
                        title: `${message.author.tag}'s bin.`,
                        description: `${message.author.tag}'s code. Check it out.`
                     }
                  );
                  message
                     .delete()
                     .then(async () => {
                        message.channel.send({
                           embeds: [
                              await client.util.embed({
                                 timestamp: true,
                                 color: 'NAVY',
                                 desc: `Here is your url: ${bin.url}`,
                                 authorName:
                                    message.author.tag,
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
                     })
                     .catch(
                        async (err: DiscordAPIError) => {
                           if (err.message) {
                              return message.channel.send({
                                 embeds: [
                                    await client.util.embed(
                                       {
                                          desc: `${
                                             ERROR.UNKNOWN
                                          }${client.util.oneblock(
                                             `Message: ${err.message} | Code: ${err.code}`
                                          )}`,
                                          color: 'RED',
                                          footer: {
                                             text: '\u3000'.repeat(
                                                10
                                             )
                                          }
                                       }
                                    )
                                 ]
                              });
                           }
                        }
                     );
               } catch (e) {
                  if (e) {
                     message.channel.send(ERROR.UNKNOWN);
                  }
               }
            }
         }
      });
   }
}
