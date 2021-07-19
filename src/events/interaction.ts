import { Interaction } from 'discord.js';
import { EventFunc } from '../typedefs/CommandEvent';

export const run: EventFunc = async (
   client,
   interaction: Interaction
) => {
   if (!interaction.isCommand()) return;

   if (interaction.isButton()) {
      await interaction.reply('HIOHIHIHIHIH');
   }
   if (interaction.id === 'primary') {
      await interaction.reply({ content: 'HJIHJIHI' });
   }
};

export const name = 'interaction';