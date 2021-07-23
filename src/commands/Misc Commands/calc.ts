import { PermissionString } from 'discord.js';
import {
   categories,
   CommandFunc
} from '../../typedefs/types';
import { ERROR } from '../../typedefs/constants';
import { evaluate } from 'mathjs';

export const run: CommandFunc = async (
   client,
   message,
   args
) => {
   const expression = args.join(' ');
   if (!expression) {
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
         const evaluation = evaluate(expression);
         const start = process.hrtime();
         const stop = process.hrtime(start);
         const result = `\`\`\`ts\n${evaluation}\`\`\``;
         const taken = `\`\`\`ts\n${
            (stop[0] * 1e9 + stop[1]) / 1e6
         }ms taken!\`\`\``;
         message.channel.send({
            embeds: [
               await client.util.embed({
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
         message.channel.send({
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
};

export const name = 'calc';
export const desc =
   'Calculates any mathematical expression.';
export const aliases: string[] = ['calculate', 'math'];
export const perms: PermissionString[] | null = [
   'SEND_MESSAGES'
];
export const cooldown = 5;
export const category: categories = 'misc';
export const usage: string | string[] =
   '<prefix>calc <expression>';