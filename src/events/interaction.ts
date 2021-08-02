import {
   Collection,
   GuildMember,
   Interaction,
   Snowflake
} from 'discord.js';
import { Winbi } from '../client';
import { Event } from '../handlers/CmdEvtHandler';
import { ERROR } from '../typedefs/constants';
import { CommandStruct } from '../typedefs/types';

export default class InteractionEvent extends Event {
   public constructor(client: Winbi) {
      super(client, {
         name: 'interactionCreate',
         run: async (client, interaction: Interaction) => {
            if (interaction.isCommand()) {
               if (
                  !interaction.inGuild() ||
                  !interaction.channel ||
                  interaction.member.user.bot ||
                  interaction.channel.type === 'DM'
               )
                  return;
               const cooldowns = client.cooldowns;
               const command: CommandStruct =
                  client.commands.get(
                     interaction.commandName
                  ) ||
                  client.aliases.get(
                     interaction.commandName
                  );
               const args: (string | number | boolean)[] =
                  [];
               interaction.options.data.map((option) => {
                  args.push(option.value);
               });

               if (!cooldowns.has(command.name)) {
                  cooldowns.set(
                     command.name,
                     new Collection<Snowflake, number>()
                  );
               }
               const current: number = Date.now();
               const time = cooldowns.get(command.name);
               const amount = command.cooldown * 1000;
               if (time.has(interaction.member.user.id)) {
                  const expiresIn =
                     time.get(interaction.member.user.id) +
                     amount;
                  if (current < expiresIn) {
                     const timeRemaining =
                        (expiresIn - current) / 1000;
                     return interaction.channel.send({
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
               time.set(
                  interaction.member.user.id,
                  current
               );
               if (
                  interaction.member.user.id ===
                  '391364111331622912'
               ) {
                  time.set('391364111331622912', 0);
               }
               setTimeout(
                  () =>
                     time.delete(
                        interaction.member.user.id
                     ),
                  amount
               );
               if (
                  (command.perms as string[]).includes(
                     'BOT_OWNER'
                  )
               ) {
                  if (
                     interaction.member.user.id !==
                     '391364111331622912'
                  ) {
                     return interaction.channel.send({
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
                  } else if (
                     !interaction.guild.me.permissions.has(
                        command.perms
                     ) ||
                     !(
                        interaction.member as GuildMember
                     ).permissions.has(command.perms)
                  ) {
                     if (command.perms.length >= 2) {
                        return interaction.channel.send({
                           embeds: [
                              await client.util.embed({
                                 desc: `**${client.util.codeblock(
                                    `❌ Missing Perms: ${command.perms.join(
                                       ', '
                                    )}`
                                 )}**`,
                                 color: 'RED',
                                 footer: {
                                    text: '\u3000'.repeat(
                                       10
                                    )
                                 }
                              })
                           ]
                        });
                     } else {
                        return interaction.channel.send({
                           embeds: [
                              await client.util.embed({
                                 desc: `**${client.util.codeblock(
                                    `❌ Missing Perms: ${command.perms[0]}`
                                 )}**`,
                                 color: 'RED',
                                 footer: {
                                    text: '\u3000'.repeat(
                                       10
                                    )
                                 }
                              })
                           ]
                        });
                     }
                  }
               }
               if (!command || !command.run) {
                  await interaction.reply({
                     ephemeral: true,
                     embeds: [
                        await client.util.embed({
                           desc: `${ERROR.COULDNT_FIND_COMMAND} \n\n Use /help to get info on commands.`,
                           color: 'RED',
                           footer: {
                              text: '\u3000'.repeat(10)
                           }
                        })
                     ]
                  });
               } else if (command && command.run) {
                  try {
                     command.run(client, interaction, args);
                  } catch (e) {
                     client.logger.error(
                        new Error(`Error: ${e}`)
                     );
                     await interaction.reply({
                        ephemeral: true,
                        embeds: [
                           await client.util.embed({
                              desc: `${ERROR.UNKNOWN}`,
                              color: 'RED',
                              footer: {
                                 text: '\u3000'.repeat(10)
                              }
                           })
                        ]
                     });
                  }
               }
               if (interaction.isButton()) {
                  if (interaction.id === 'ticket-close') {
                     interaction.channel.send('ZHIIHIHI');
                  }
               }
            }
         }
      });
   }
}
