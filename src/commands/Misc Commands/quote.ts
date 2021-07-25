import { ERROR } from '../../typedefs/constants';
import axios, { AxiosResponse } from 'axios';
import { QuoteResponse } from '../../typedefs/types';
import Command from '../../handlers/CommandHandler';
import { Winbi } from '../../client';

export default class Quote extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'quote',
         desc: 'Gets a random quote.',
         perms: ['SEND_MESSAGES'],
         cooldown: 15,
         category: 'misc',
         usage: '<prefix>quote',
         run: async (client, message) => {
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
                           iconURL:
                              client.user.displayAvatarURL()
                        }
                     })
                  ]
               });
            }
         }
      });
   }
}
