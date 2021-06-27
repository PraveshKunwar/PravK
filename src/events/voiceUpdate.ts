import { VoiceState } from "discord.js";
import { EventFunc } from "../typedefs/commandEvent";

export const run: EventFunc = async (
  client,
  oldState: VoiceState,
  newState: VoiceState
) => {
  //console.log(`OldState: ${oldState.mute} | Newstate: ${newState.mute}`);
};

export const name: string = "voiceStateUpdate";
