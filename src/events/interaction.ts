import { Interaction } from 'discord.js';
import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (
   client,
   interaction: Interaction
) => {
   console.log(interaction);
};

export const name = 'interaction';
