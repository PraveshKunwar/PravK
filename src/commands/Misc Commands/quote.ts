import { ERROR } from '../../typedefs/constants';
import axios, { AxiosResponse } from 'axios';
import { QuoteResponse } from '../../typedefs/types';
import { Command } from '../../handlers/CmdEvtHandler';
import { PravK } from '../../client';

export default class Quote extends Command {
   public constructor(client: PravK) {
      super(client, {
         name: 'quote',
         desc: 'Gets a random quote.',
         perms: ['SEND_MESSAGES'],
         cooldown: 15,
         category: 'misc',
         usage: '/quote',
         slashCommandOptions: {
            name: 'quote',
            description: 'Gets a quote.'
         },
         run: async (client, interaction) => {
            const BASE = 'https://api.quotable.io/random';
            const res: AxiosResponse<QuoteResponse> =
               await axios.get(BASE);
            if (res.status === 404) {
               return interaction.reply({
                  ephemeral: true,
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
               interaction.reply({
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
                        authorName: interaction.user.tag,
                        authorIcon:
                           interaction.user.displayAvatarURL(),
                        footer: {
                           text: 'PravK Bot • Created By PraveshK',
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
