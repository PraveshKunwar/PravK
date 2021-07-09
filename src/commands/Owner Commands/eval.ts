import { inspect } from 'util';
import { embed } from '../../lib/embed';
import {
   categories,
   CommandFunc
} from '../../typedefs/commandEvent';
import { ERROR } from '../../typedefs/constants';

export const run: CommandFunc = async (
   client,
   message,
   args
) => {
   const evaluation = args.join(' ');
   if (message.member?.id !== '391364111331622912')
      return message.channel.send({
         embeds: [
            embed({
               desc: ERROR.NOT_OWNER,
               color: 'RED',
               footer: {
                  text: '\u3000'.repeat(10)
               }
            })
         ]
      });
   if (!evaluation)
      return message.channel.send({
         embeds: [
            embed({
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
   if (
      evaluation.includes('process') ||
      evaluation.includes('process.exit()')
   ) {
      message.channel.send(ERROR.PROCESS);
   }
   if (
      evaluation &&
      message.member?.id === '391364111331622912'
   ) {
      try {
         evaled = eval(evaluation);
         const result = `\`\`\`ts\n${inspect(evaled, {
            depth: 0
         })}\`\`\``;
         const taken = `\`\`\`ts\n${
            (stop[0] * 1e9 + stop[1]) / 1e6
         }ms taken!\`\`\``;
         message.channel.send({
            embeds: [
               embed({
                  timestamp: true,
                  footer: {
                     text: `Winbi Bot • Created By PraveshK`,
                     iconURL: client.user.displayAvatarURL()
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
                  embed({
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
};

export const name = 'eval';
export const aliases = ['e', 'evaluate'];
export const desc = 'Evaluate string.';
export const cooldown = 5;
export const category: categories = 'owner';
