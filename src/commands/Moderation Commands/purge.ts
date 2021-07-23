import {
   DiscordAPIError,
   PermissionString,
   TextChannel
} from 'discord.js';
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
   const toDeleteMsgs = Number(args[0]);
   if (
      !toDeleteMsgs ||
      isNaN(toDeleteMsgs) ||
      toDeleteMsgs > 100
   ) {
      return message.channel.send({
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
   } else if (!message.channel.messages) {
      return message.channel.send({
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
      (message.channel as TextChannel)
         .bulkDelete(toDeleteMsgs, true)
         .then(async () => {
            return message.channel.send({
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
            return message.channel.send({
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
};

export const name = 'purge';
export const aliases = ['clear'];
export const desc = 'Delete x messages.';
export const perms: PermissionString[] | null = [
   'SEND_MESSAGES',
   'MANAGE_MESSAGES'
];
export const cooldown = 20;
export const category: categories = 'moderation';
export const usage: string | string[] =
   '<prefix>purge <number less than 1000>';
