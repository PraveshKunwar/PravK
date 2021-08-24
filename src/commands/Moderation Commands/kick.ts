import { Command } from '../../handlers/CmdEvtHandler';
import { PravK } from '../../client';
import { GuildMember, Snowflake, User } from 'discord.js';
import { ERROR } from '../../typedefs/constants';

export default class Kick extends Command {
   public constructor(client: PravK) {
      super(client, {
         name: 'kick',
         aliases: ['boot'],
         desc: 'Kick any member from the server.',
         perms: ['SEND_MESSAGES', 'KICK_MEMBERS'],
         cooldown: 10,
         category: 'moderation',
         usage: '/kick <member> <reason>',
         slashCommandOptions: {
            name: 'kick',
            description: 'Kick any user from the guild.',
            options: [
               {
                  name: 'user',
                  type: 'USER',
                  description:
                     'The member that is going to be kicked.',
                  required: true
               },
               {
                  name: 'reason',
                  type: 'STRING',
                  description:
                     'The reason why this member is being kicked.',
                  required: false
               }
            ]
         },
         run: async (client, interaction, args) => {
            const [user, reason] = args;
            if (!user) {
               return interaction.reply({
                  ephemeral: true,
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
               return interaction.reply({
                  ephemeral: true,
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
            if (
               client.util.parseMentions(user as string) ===
               client.user.id
            ) {
               return interaction.reply({
                  ephemeral: true,
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
               client.util.parseMentions(user as string) ===
               interaction.member.user.id
            ) {
               return interaction.reply({
                  ephemeral: true,
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
               return interaction.reply({
                  ephemeral: true,
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
               return interaction.reply({
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
                  .kick(
                     reason
                        ? (reason as string)
                        : 'No reason'
                  )
                  .then(async (member) => {
                     return interaction.reply({
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
                                 text: 'PravK Bot • Created By PraveshK',
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
                     return interaction.reply({
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
                  });
            }
         }
      });
   }
}
