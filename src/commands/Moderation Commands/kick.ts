import { Command } from '../../handlers/CmdEvtHandler';
import { Winbi } from '../../client';
import { GuildMember, Snowflake, User } from 'discord.js';
import { ERROR } from '../../typedefs/constants';

export default class Kick extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'kick',
         aliases: ['boot'],
         desc: 'Kick any member from the server.',
         perms: ['SEND_MESSAGES', 'KICK_MEMBERS'],
         cooldown: 10,
         category: 'moderation',
         usage: '<prefix>kick <member> <reason>',
         slashCommandOptions: {
            name: 'kick',
            description: 'Kick any user from the guild.',
            options: [
               {
                  name: 'user',
                  type: 'USER',
                  description:
                     'The member that is going to be kicked.'
               }
            ]
         },
         run: async (client, interaction, args) => {
            if (!args[0]) {
               return interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.MENTION_USER,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            }
            const memberToKick =
               (await client.util.getMember(
                  interaction,
                  client.util.parseMentions(
                     interaction.options.get('user')
                        .value as string
                  )
               )) ||
               (await client.util.getMember(
                  interaction,
                  interaction.options.get('user')
                     .value as Snowflake
               ));
            if (
               !memberToKick ||
               memberToKick === undefined
            ) {
               return interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.USER_NO_EXIST,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            }
            const reason =
               interaction.options.get('reason').value;
            if (
               client.util.parseMentions(
                  interaction.options.get('user')
                     .value as string
               ) === client.user.id
            ) {
               return interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: `❌ Cannot kick myself.`,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            } else if (
               client.util.parseMentions(
                  interaction.options.get('user')
                     .value as string
               ) === interaction.member.user.id
            ) {
               return interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: `❌ Cannot kick yourself.`,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            }
            const checkRoles =
               await client.util.checkRolePosition(
                  interaction.member as GuildMember,
                  memberToKick
               );
            if (
               checkRoles === false ||
               checkRoles === 'same'
            ) {
               return interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.HIGHER_SAME_ROLE,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            }
            if (!memberToKick.kickable) {
               return interaction.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: `❌ Mentioned member was not kickable. Try again.`,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            } else {
               memberToKick
                  .kick()
                  .then(async (member) => {
                     return interaction.channel.send({
                        embeds: [
                           await client.util.embed({
                              timestamp: true,
                              color: 'NAVY',

                              authorName: (
                                 interaction.member
                                    .user as User
                              ).tag,
                              authorIcon: (
                                 interaction.member
                                    .user as User
                              ).displayAvatarURL(),
                              footer: {
                                 text: 'Winbi Bot • Created By PraveshK',
                                 iconURL:
                                    client.user.displayAvatarURL()
                              },
                              desc: `**⚒️ Kicked**: ${
                                 member.user.tag
                              } \n\n **📜 Reason**: ${
                                 reason
                                    ? reason
                                    : 'No reason.'
                              }`
                           })
                        ]
                     });
                  })
                  .catch(async () => {
                     return interaction.channel.send({
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
                  });
            }
         }
      });
   }
}
