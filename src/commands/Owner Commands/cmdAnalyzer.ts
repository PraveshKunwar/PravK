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
         run: async (client, message, args) => {
            try {
               const cmd = args.join(' ');
               if (!cmd) {
                  message.channel.send(ERROR.NO_ARGS);
               } else if (cmd) {
                  const fileContent = await cmdAnalyzer({
                     path: cmd
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
                  message.channel.send({
                     embeds: [ContentEmbed]
                  });
               }
            } catch (e) {
               message.channel.send(ERROR.UNKNOWN);
            }
         }
      });
   }
}
