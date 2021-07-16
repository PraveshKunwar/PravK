import { Interaction } from 'discord.js';
import { EventFunc } from '../typedefs/commandEvent';

export const run: EventFunc = async (
   client,
   interaction: Interaction
) => {
   if (!interaction.isCommand()) return;

   if (interaction.isButton()) {
      await interaction.reply('HIOHIHIHIHIH');
   }
};

export const name = 'interaction';
