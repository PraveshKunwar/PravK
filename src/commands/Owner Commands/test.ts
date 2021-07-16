import {
   MessageActionRow,
   MessageButton,
   MessageComponentInteractionCollector
} from 'discord.js';
import {
   categories,
   CommandFunc
} from '../../typedefs/commandEvent';

export const run: CommandFunc = async (
   client,
   message,
   args
) => {
   const row = new MessageActionRow().addComponents(
      new MessageButton()
         .setCustomID('primary')
         .setLabel('Primary')
         .setStyle('PRIMARY')
   );
   await message.channel.send({
      content: 'HI',
      components: [row]
   });
};

export const name = 'test';
export const desc = 'Test anything.';
export const cooldown = 5;
export const category: categories = 'owner';
