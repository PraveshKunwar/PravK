import { Command } from '../../handlers/CmdEvtHandler';
import { Winbi } from '../../client';
import { Snowflake } from 'discord.js';
import { ERROR } from '../../typedefs/constants';

export default class Ban extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'ban',
         desc: 'Ban any member from the server.',
         perms: ['SEND_MESSAGES', 'BAN_MEMBERS'],
         cooldown: 10,
         category: 'moderation',
         usage: '<prefix>ban <member> <optional reason>',
         run: async (client, message, args) => {
            if (!args[0]) {
               return message.channel.send({
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
                  message,
                  client.util.parseMentions(args[0])
               )) ||
               (await client.util.getMember(
                  message,
                  args[0] as Snowflake
               ));
            if (!memberToBan || memberToBan === undefined) {
               return message.channel.send({
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
            const reason = args.slice(1).join(' ');
            if (
               client.util.parseMentions(args[0]) ===
               client.user.id
            ) {
               return message.channel.send({
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
               client.util.parseMentions(args[0]) ===
               message.member.id
            ) {
               return message.channel.send({
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
                  message.member,
                  memberToBan
               );
            if (
               checkRoles === false ||
               checkRoles === 'same'
            ) {
               return message.channel.send({
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
               return message.channel.send({
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
                  .ban({ reason })
                  .then(async (member) => {
                     return message.channel.send({
                        embeds: [
                           await client.util.embed({
                              timestamp: true,
                              color: 'NAVY',

                              authorName:
                                 message.author.tag,
                              authorIcon:
                                 message.author.displayAvatarURL(),
                              footer: {
                                 text: 'Winbi Bot • Created By PraveshK',
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
                     return message.channel.send({
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
