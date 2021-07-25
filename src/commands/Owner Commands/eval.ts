import { inspect } from 'util';
import { ERROR } from '../../typedefs/constants';
import * as ts from 'typescript';
import Command from '../../handlers/CommandHandler';
import { Winbi } from '../../client';

export default class Eval extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'eval',
         aliases: ['e', 'evaluate'],
         desc: 'Evaluate anything.',
         perms: ['SEND_MESSAGES'],
         cooldown: 5,
         category: 'owner',
         run: async (client, message, args) => {
            const evaluation = args.join(' ');
            if (!evaluation)
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

            let evaled;
            const start = process.hrtime();
            const stop = process.hrtime(start);
            const prRegex = new RegExp(/process/gi);
            const tokenRegex = new RegExp(/token/gi);
            if (prRegex.test(evaluation) === true) {
               return message.channel.send({
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
            if (tokenRegex.test(evaluation) === true) {
               return message.channel.send({
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
               message.member?.id === '391364111331622912'
            ) {
               try {
                  evaled = eval(ts.transpile(evaluation));
                  const result = `\`\`\`ts\n${inspect(
                     evaled,
                     {
                        depth: 0
                     }
                  )}\`\`\``;
                  const taken = `\`\`\`ts\n${
                     (stop[0] * 1e9 + stop[1]) / 1e6
                  }ms taken!\`\`\``;
                  message.channel.send({
                     embeds: [
                        await client.util.embed({
                           timestamp: true,
                           footer: {
                              text: `Winbi Bot • Created By PraveshK`,
                              iconURL:
                                 client.user.displayAvatarURL()
                           },
                           authorName: message.author.tag,
                           authorIcon:
                              message.author.displayAvatarURL(),
                           desc: `	**Result:**\n${result}\n**Time Taken:**\n${taken}`,
                           color: 'NAVY'
                        })
                     ]
                  });
               } catch (e) {
                  if (e) {
                     message.channel.send({
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
