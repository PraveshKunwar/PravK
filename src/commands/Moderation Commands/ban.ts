import { Command } from '../../handlers/CmdEvtHandler';
import { PravK } from '../../client';
import { GuildMember, Snowflake } from 'discord.js';
import { ERROR } from '../../typedefs/constants';

export default class Ban extends Command {
   public constructor(client: PravK) {
      super(client, {
         name: 'ban',
         desc: 'Ban any member from the server.',
         perms: ['SEND_MESSAGES', 'BAN_MEMBERS'],
         cooldown: 10,
         category: 'moderation',
         usage: '/ban <member> <optional reason>',
         slashCommandOptions: {
            name: 'ban',
            description: 'Ban any user from the guild.',
            options: [
               {
                  name: 'user',
                  type: 'USER',
                  description:
                     'The member that is going to be banned.',
                  required: true
               },
               {
                  name: 'reason',
                  type: 'STRING',
                  description:
                     'The reason why this member is being banned.',
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
            const memberToBan =
               (await client.util.getMember(
                  interaction,
                  client.util.parseMentions(user as string)
               )) ||
               (await client.util.getMember(
                  interaction,
                  user as Snowflake
               ));
            if (!memberToBan || memberToBan === undefined) {
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
                        desc: `❌ Cannot ban myself.`,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            } else if (
               client.util.parseMentions(user as string) ===
               (interaction.member as GuildMember).id
            ) {
               return interaction.reply({
                  ephemeral: true,
                  embeds: [
                     await client.util.embed({
                        desc: `❌ Cannot ban yourself.`,
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
                  memberToBan
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
            if (!memberToBan.bannable) {
               return interaction.reply({
                  ephemeral: true,
                  embeds: [
                     await client.util.embed({
                        desc: `❌ Mentioned member was not bannable. Try again.`,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            } else {
               memberToBan
                  .ban({ reason: reason as string })
                  .then(async (member) => {
                     return interaction.reply({
                        embeds: [
                           await client.util.embed({
                              timestamp: true,
                              color: 'NAVY',

                              authorName:
                                 interaction.user.tag,
                              authorIcon:
                                 interaction.user.displayAvatarURL(),
                              footer: {
                                 text: 'PravK Bot • Created By PraveshK',
                                 iconURL:
                                    client.user.displayAvatarURL()
                              },
                              desc: `**⚒️ Banned**: ${
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
