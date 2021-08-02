import { ERROR } from '../../typedefs/constants';
import { MessageEmbed, Util } from 'discord.js';
import { readFile } from 'fs/promises';
import { Stats, statSync } from 'fs';
import { Command } from '../../handlers/CmdEvtHandler';
import { Winbi } from '../../client';

interface Analyzer {
   path: string;
}
const cmdAnalyzer = async ({
   path
}: Partial<Readonly<Analyzer>>): Promise<{
   file: string;
   stats: Stats;
}> => {
   const file = await readFile(path, 'utf8');
   const stats = statSync(path, {
      bigint: false,
      throwIfNoEntry: true
   });

   return { file, stats };
};

export default class CmdAnalzyer extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'cmd',
         aliases: ['cmdyzer', 'cmd-analyzer'],
         desc: 'Analyze any command easily.',
         perms: ['SEND_MESSAGES'],
         cooldown: 5,
         category: 'owner',
         slashCommandOptions: {
            name: 'cmd-analyzer',
            description: 'Analyze any command.',
            options: [
               {
                  name: 'cmd',
                  type: 'STRING',
                  description: 'Command to analyze.',
                  required: true
               }
            ]
         },
         run: async (client, interaction, args) => {
            try {
               const [cmd] = args;
               if (!cmd)
                  return interaction.reply({
                     ephemeral: true,
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
               else if (cmd) {
                  const fileContent = await cmdAnalyzer({
                     path: cmd as string
                  });
                  const ContentEmbed = new MessageEmbed()
                     .setColor('#333')
                     .setTitle(`File loaded:`);
                  if (fileContent.file.length > 2048) {
                     const splitCmd = Util.splitMessage(
                        fileContent.file,
                        {
                           maxLength: 512,
                           char: '\n',
                           prepend: '',
                           append: ''
                        }
                     );
                     ContentEmbed.setDescription(
                        `\`\`\`ts\n${splitCmd.shift()}\`\`\`\n\n`
                     );
                     splitCmd.forEach((i) =>
                        ContentEmbed.addField(
                           '\u200B',
                           `\`\`\`ts\n${i}\`\`\``
                        )
                     );
                  } else {
                     ContentEmbed.setDescription(
                        `\`\`\`ts\n${fileContent}\`\`\``
                     );
                  }
                  interaction.reply({
                     embeds: [ContentEmbed]
                  });
               }
            } catch (e) {
               interaction.channel.send(ERROR.UNKNOWN);
            }
         }
      });
   }
}
