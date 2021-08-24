import { Routes } from 'discord-api-types/v9';
import { Command } from '../../handlers/CmdEvtHandler';
import { PravK } from '../../client';
import { Message } from 'discord.js';
import { ERROR } from '../../typedefs/constants';

export default class Eval extends Command {
   public constructor(client: PravK) {
      super(client, {
         name: 'deploy',
         desc: 'Deploy commands',
         perms: ['SEND_MESSAGES'],
         cooldown: 5,
         category: 'owner',
         slashCommandOptions: {
            name: 'deploy',
            description: 'Deploy commands.'
         },
         run: async (client, interaction) => {
            (async () => {
               try {
                  const t = await interaction.followUp({
                     embeds: [
                        await client.util.embed({
                           timestamp: true,
                           footer: {
                              text: `PravK Bot • Created By PraveshK`,
                              iconURL:
                                 client.user.displayAvatarURL()
                           },
                           authorName: interaction.user.tag,
                           authorIcon:
                              interaction.user.displayAvatarURL(),
                           desc: `Refreshing commands...`,
                           color: 'NAVY'
                        })
                     ]
                  });
                  await client.rest_v9.put(
                     Routes.applicationCommands(
                        client.user.id
                     ),
                     {
                        body: [
                           ...client.commands.values()
                        ].map((i) => i.slashCommandOptions)
                     }
                  );
                  (t as Message).edit({
                     embeds: [
                        await client.util.embed({
                           timestamp: true,
                           footer: {
                              text: `PravK Bot • Created By PraveshK`,
                              iconURL:
                                 client.user.displayAvatarURL()
                           },
                           authorName: interaction.user.tag,
                           authorIcon:
                              interaction.user.displayAvatarURL(),
                           desc: `Refreshed commands!`,
                           color: 'NAVY'
                        })
                     ]
                  });
               } catch {
                  interaction.reply({
                     ephemeral: true,
                     embeds: [
                        await client.util.embed({
                           desc: ERROR.UNKNOWN,
                           color: 'RED',
                           footer: {
                              text: '\u3000'.repeat(10)
                           }
                        })
                     ]
                  });
               }
            })();
         }
      });
   }
}
