import { PermissionString } from 'discord.js';
import {
   categories,
   CommandFunc
} from '../../typedefs/CommandEvent';
import { ERROR } from '../../typedefs/constants';
import axios, { AxiosResponse } from 'axios';
import { QuoteResponse } from '../../typedefs/Response';

export const run: CommandFunc = async (
   client,
   message,
   args
) => {
   const BASE = 'https://api.quotable.io/random';
   const res: AxiosResponse<QuoteResponse> =
      await axios.get(BASE);
   if (res.status === 404) {
      return message.channel.send({
         embeds: [
            await client.util.embed({
               desc: `${ERROR.FAILED_REQUEST}`,
               color: 'RED',
               footer: {
                  text: '\u3000'.repeat(10)
               }
            })
         ]
      });
   } else {
      message.channel.send({
         embeds: [
            await client.util.embed({
               timestamp: true,
               color: 'NAVY',
               desc: `📜 Quote: **${
                  res.data.content
               }** \n\n🧍 Author: **${
                  res.data.author
               }** \n\n 📅 Date Added: **${
                  res.data.datedAdded !== undefined
                     ? res.data.datedAdded
                     : 'None specified.'
               }**`,
               authorName: message.author.tag,
               authorIcon:
                  message.author.displayAvatarURL(),
               footer: {
                  text: 'Winbi Bot • Created By PraveshK',
                  iconURL: client.user.displayAvatarURL()
               }
            })
         ]
      });
   }
};

export const name = 'quote';
export const desc = 'Gets a random quote.';
export const perms: PermissionString[] | null = [
   'SEND_MESSAGES'
];
export const cooldown = 5;
export const category: categories = 'misc';
export const usage: string | string[] = '<prefix>quote';
