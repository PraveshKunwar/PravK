import Command from '../../handlers/CommandHandler';
import { Winbi } from '../../client';
import { Snowflake } from 'discord.js';
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
         usage: '<prefix>kick <member> <optional reason>',
         run: async (client, message, args) => {
            if (!args[0]) {
               return message.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: ERROR.NO_ARGS,
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
                  message,
                  client.util.parseMentions(args[0])
               )) ||
               (await client.util.getMember(
                  message,
                  args[0] as Snowflake
               ));
            if (
               !memberToKick ||
               memberToKick === undefined
            ) {
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
                        desc: `❌ Cannot kick myself.`,
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
                  message.member,
                  memberToKick
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
            if (!memberToKick.kickable) {
               return message.channel.send({
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
                              desc: `**Kicked**: ${
                                 member.user.tag
                              } \n\n **Reason**: ${
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
