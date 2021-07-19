import { PermissionString } from 'discord.js';
import {
   categories,
   CommandFunc
} from '../../typedefs/CommandEvent';
import { ERROR } from '../../typedefs/constants';
import axios, { AxiosResponse } from 'axios';
import { JokeResponse } from '../../typedefs/Response';
import { embed } from '../../lib/embed';

export const run: CommandFunc = async (
   client,
   message,
   args
) => {
   const BASE =
      'https://official-joke-api.appspot.com/jokes/random';
   const res: AxiosResponse<JokeResponse> = await axios.get(
      BASE
   );
   if (res.status === 404) {
      return message.channel.send({
         embeds: [
            embed({
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
            embed({
               timestamp: true,
               color: 'NAVY',
               desc: `❓ Question: **${res.data.setup}** \n\n✅ Answer: **${res.data.punchline}**`,
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

export const name = 'joke';
export const desc = 'Gets a random joke.';
export const perms: PermissionString[] | null = [
   'SEND_MESSAGES'
];
export const cooldown = 10;
export const category: categories = 'misc';
export const usage: string | string[] = '<prefix>joke';
