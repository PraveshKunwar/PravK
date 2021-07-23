import { VoiceState } from 'discord.js';
import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (
   client,
   oldState: VoiceState,
   newState: VoiceState
) => {
   console.log(
      `OldState: ${oldState.mute} | Newstate: ${newState.mute}`
   );
};

export const name = 'voiceStateUpdate';
