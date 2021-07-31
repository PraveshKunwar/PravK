import { ERROR } from '../../typedefs/constants';
import axios, { AxiosResponse } from 'axios';
import { JokeResponse } from '../../typedefs/types';
import { Command } from '../../handlers/CmdEvtHandler';
import { Winbi } from '../../client';

export default class Quote extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'joke',
         desc: 'Gets a random joke.',
         perms: ['SEND_MESSAGES'],
         cooldown: 15,
         category: 'misc',
         usage: '<prefix>joke',
         run: async (client, interaction) => {
            const BASE =
               'https://official-joke-api.appspot.com/jokes/random';
            const res: AxiosResponse<JokeResponse> =
               await axios.get(BASE);
            if (res.status === 404) {
               return interaction.channel.send({
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
               interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        timestamp: true,
                        color: 'NAVY',
                        desc: `❓ Question: **${res.data.setup}** \n\n✅ Answer: **${res.data.punchline}**`,
                        authorName: interaction.user.tag,
                        authorIcon:
                           interaction.user.displayAvatarURL(),
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
