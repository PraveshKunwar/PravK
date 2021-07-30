import { Collection, Message, Snowflake } from 'discord.js';
import { CommandStruct } from '../typedefs/types';
import { ERROR } from '../typedefs/constants';
import leven from 'leven';
import { Event } from '../handlers/CmdEvtHandler';
import { Winbi } from '../client';

export default class MessageEvent extends Event {
   public constructor(client: Winbi) {
      super(client, {
         name: 'message',
         run: async (client, message: Message) => {
            const prefix = '.';
            const cooldowns = client.cooldowns;
            if (message.partial) await message.fetch();
            if (
               message.content.match(
                  new RegExp(`^<@!?${client.user.id}> ?$`)
               )
            ) {
               return message.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: `❓ Type ${prefix}help to get more information.`,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            }
            if (
               message.author.bot ||
               !message.guild ||
               message.channel.type === 'dm' ||
               !message.channel.isText() ||
               !message.content.startsWith(prefix)
            )
               return;

            const args: string[] = message.content
               .slice(prefix.length)
               .trim()
               .split(/ +/g);
            const cmd: string = args.shift();
            const command: CommandStruct =
               client.commands.get(cmd) ||
               client.aliases.get(cmd);
            if (!command || !command.run) {
               const best: string[] = [
                  ...client.commands.map(
                     (value: CommandStruct) => value.name
                  ),
                  ...client.aliases.map((val, key) => key)
               ].filter(
                  (input: string) =>
                     leven(
                        cmd.toLowerCase(),
                        input.toLowerCase()
                     ) <
                     input.length * 0.4
               );
               const dym: string =
                  best.length == 0
                     ? ''
                     : best.length == 1
                     ? `\nDid you mean this?: **${best[0]}**`
                     : `\nDid you mean one of these?: \n${best
                          .slice(0, 3)
                          .map(
                             (value: string) =>
                                `**${value}**`
                          )
                          .join('\n')}`;
               return message.channel.send({
                  embeds: [
                     await client.util.embed({
                        desc: `${ERROR.COULDNT_FIND_COMMAND} ${dym} \n\n Use **${prefix}** help to get info on commands.`,
                        color: 'RED',
                        footer: {
                           text: '\u3000'.repeat(10)
                        }
                     })
                  ]
               });
            } else {
               try {
                  command.run(client, message, args);
               } catch (e) {
                  client.logger.error(
                     new Error(`Error: ${e}`)
                  );
               }
            }
            if (!cooldowns.has(command.name)) {
               cooldowns.set(
                  command.name,
                  new Collection<Snowflake, number>()
               );
            }
            const current: number = Date.now();
            const time = cooldowns.get(command.name);
            const amount = command.cooldown * 1000;
            if (time.has(message.author.id)) {
               const expiresIn =
                  time.get(message.author.id) + amount;
               if (current < expiresIn) {
                  const timeRemaining =
                     (expiresIn - current) / 1000;
                  return message.channel.send({
                     embeds: [
                        await client.util.embed({
                           desc: `⌚ Please wait **${timeRemaining.toFixed(
                              2
                           )}** seconds before using the **${
                              command.name
                           }** command.`,
                           color: 'RED',
                           footer: {
                              text: '\u3000'.repeat(10)
                           }
                        })
                     ]
                  });
               }
            }
            time.set(message.author.id, current);
            if (
               message.author.id === '391364111331622912'
            ) {
               time.set('391364111331622912', 0);
            }
            setTimeout(
               () => time.delete(message.author.id),
               amount
            );
            if (
               (command.perms as string[]).includes(
                  'BOT_OWNER'
               )
            ) {
               if (
                  message.author.id !== '391364111331622912'
               ) {
                  return message.channel.send({
                     embeds: [
                        await client.util.embed({
                           desc: ERROR.NOT_OWNER,
                           color: 'RED',
                           footer: {
                              text: '\u3000'.repeat(10)
                           }
                        })
                     ]
                  });
               }
            } else if (
               !message.guild.me.permissions.has(
                  command.perms
               ) ||
               !message.member.permissions.has(
                  command.perms
               )
            ) {
               if (command.perms.length >= 2) {
                  return message.channel.send({
                     embeds: [
                        await client.util.embed({
                           desc: `**${client.util.codeblock(
                              `❌ Missing Perms: ${command.perms.join(
                                 ', '
                              )}`
                           )}**`,
                           color: 'RED',
                           footer: {
                              text: '\u3000'.repeat(10)
                           }
                        })
                     ]
                  });
               } else {
                  return message.channel.send({
                     embeds: [
                        await client.util.embed({
                           desc: `**${client.util.codeblock(
                              `❌ Missing Perms: ${command.perms[0]}`
                           )}**`,
                           color: 'RED',
                           footer: {
                              text: '\u3000'.repeat(10)
                           }
                        })
                     ]
                  });
               }
            }
         }
      });
   }
}
