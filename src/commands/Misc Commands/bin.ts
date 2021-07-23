import {
   DiscordAPIError,
   PermissionString
} from 'discord.js';
import sourcebin from 'sourcebin';
import {
   categories,
   CommandFunc
} from '../../typedefs/types';
import { ERROR } from '../../typedefs/constants';

export const run: CommandFunc = async (
   client,
   message,
   args
) => {
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
                        authorName: message.author.tag,
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
            .catch(async (err: DiscordAPIError) => {
               if (err.message) {
                  return message.channel.send({
                     embeds: [
                        await client.util.embed({
                           desc: `${
                              ERROR.UNKNOWN
                           }${client.util.oneblock(
                              `Message: ${err.message} | Code: ${err.code}`
                           )}`,
                           color: 'RED',
                           footer: {
                              text: '\u3000'.repeat(10)
                           }
                        })
                     ]
                  });
               }
            });
      } catch (e) {
         if (e) {
            message.channel.send(ERROR.UNKNOWN);
         }
      }
   }
};

export const name = 'bin';
export const aliases = ['sourcebin', 'code'];
export const desc = 'Upload code to sourcebin easily.';
export const perms: PermissionString[] | null = [
   'SEND_MESSAGES'
];
export const cooldown = 10;
export const category: categories = 'misc';
export const usage: string | string[] =
   '<prefix>bin <source code>';
