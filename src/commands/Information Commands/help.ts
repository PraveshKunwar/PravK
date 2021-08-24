import {
   categories,
   CommandStruct
} from '../../typedefs/types';
import { ERROR } from '../../typedefs/constants';
import { PravK } from '../../client';
import { Command } from '../../handlers/CmdEvtHandler';

export default class Help extends Command {
   public constructor(client: PravK) {
      super(client, {
         name: 'help',
         desc: 'Help command to get info on commands or specific command.',
         perms: ['SEND_MESSAGES'],
         cooldown: 0,
         category: 'information',
         usage: '/help <command name>',
         slashCommandOptions: {
            name: 'help',
            description: 'Help on all my commands.',
            options: [
               {
                  name: 'command',
                  type: 'STRING',
                  description: 'Command to get info on.',
                  required: false
               }
            ]
         },
         run: async (client, interaction, args) => {
            const filterCmds = client.commands.filter(
               (i) => i.category !== 'owner'
            );
            const filterAliases = client.aliases.filter(
               (i) => i.category !== 'owner'
            );
            const [command] = args;
            const categoryCmds = (
               category: categories
            ): string => {
               return filterCmds
                  .filter((i) => i.category === category)
                  .map((cmd) => cmd.name)
                  .join(', ');
            };
            if (!args || !command) {
               interaction.reply({
                  embeds: [
                     await client.util.embed({
                        fields: [
                           {
                              name: '🛠 Moderation',
                              value: `${client.util.codeblock(
                                 categoryCmds('moderation')
                              )}`,
                              inline: true
                           },
                           {
                              name: '💵 Currency',
                              value: `${client.util.codeblock(
                                 categoryCmds('currency')
                              )}`,
                              inline: true
                           },
                           {
                              name: '❓ Information',
                              value: `${client.util.codeblock(
                                 categoryCmds('information')
                              )}`,
                              inline: true
                           },
                           {
                              name: '🎖 Miscellaneous',
                              value: `${client.util.codeblock(
                                 categoryCmds('misc')
                              )}`,
                              inline: true
                           }
                        ],
                        timestamp: true,
                        color: 'NAVY',
                        authorName: interaction.user.tag,
                        authorIcon:
                           interaction.user.displayAvatarURL(),
                        footer: {
                           text: 'PravK Bot • Created By PraveshK',
                           iconURL:
                              client.user.displayAvatarURL()
                        },
                        title: 'Help Dashboard',
                        desc: `Welcome to the help section. Type ${client.util.codeblock(
                           '<prefix>help <command name>'
                        )} to quickly get help on a command. \n\n Here are a list of all the commands down below: \n\nIf you need more help: [Github](https://github.com/PraveshKunwar/PravK) • Discord: **PraveshK#4056**
             `
                     })
                  ]
               });
            } else {
               const cmd: CommandStruct =
                  filterCmds.get(command as string) ||
                  filterAliases.get(command as string);
               if (!cmd || typeof cmd === 'undefined') {
                  return interaction.reply({
                     ephemeral: true,
                     embeds: [
                        await client.util.embed({
                           desc: ERROR.COULD_NOT_FIND,
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
                           title: `Command Name: ${cmd.name.toLowerCase()}`,
                           authorName: interaction.user.tag,
                           authorIcon:
                              interaction.user.displayAvatarURL(),
                           footer: {
                              text: 'PravK Bot • Created By PraveshK',
                              iconURL:
                                 client.user.displayAvatarURL()
                           },
                           fields: [
                              {
                                 name: '📜 Description',
                                 value: client.util.codeblock(
                                    cmd.desc
                                 ),
                                 inline: true
                              },
                              {
                                 name: '❣ Usage',
                                 value: client.util.codeblock(
                                    Array.isArray(cmd.usage)
                                       ? cmd.usage.join(
                                            ', '
                                         )
                                       : cmd.usage
                                 ),
                                 inline: true
                              },
                              {
                                 name: '🚀 Aliases',
                                 value: client.util.codeblock(
                                    Array.isArray(
                                       cmd.aliases
                                    )
                                       ? cmd.aliases.join(
                                            ', '
                                         )
                                       : typeof cmd.aliases ===
                                         'undefined'
                                       ? 'No aliases.'
                                       : cmd.aliases
                                 ),
                                 inline: true
                              },
                              {
                                 name: '⌚ Cooldown',
                                 value: client.util.codeblock(
                                    cmd.cooldown +
                                       ' seconds'
                                 ),
                                 inline: true
                              },
                              {
                                 name: '📚 Category',
                                 value: client.util.codeblock(
                                    cmd.category
                                 ),
                                 inline: true
                              },
                              {
                                 name: '🏆 Permissions',
                                 value: client.util.codeblock(
                                    Array.isArray(cmd.perms)
                                       ? cmd.perms.join(
                                            ', '
                                         )
                                       : cmd.perms === null
                                       ? 'No permissions.'
                                       : cmd.perms
                                 ),
                                 inline: true
                              }
                           ]
                        })
                     ]
                  });
               }
            }
         }
      });
   }
}
