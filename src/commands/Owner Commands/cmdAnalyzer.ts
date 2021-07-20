import {
   categories,
   CommandFunc
} from '../../typedefs/CommandEvent';
import { ERROR } from '../../typedefs/constants';
import { cmdAnalyzer } from '../../handlers/CmdAnalyzer';
import { MessageEmbed, Util } from 'discord.js';

export const run: CommandFunc = async (
   client,
   message,
   args
) => {
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
};

export const name = 'cmd';
export const aliases = ['cmdyzer', 'cmd-analyzer'];
export const desc = 'Analyze any command easily.';
export const perms: string | string[] | null = [
   'BOT_OWNER'
];
export const cooldown = 5;
export const category: categories = 'owner';
