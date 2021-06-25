import {
  Interaction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from "discord.js";
import { EventFunc } from "../typedefs/commandEvent";

export const run: EventFunc = async (client, interaction: Interaction) => {
  console.log(`interaction with id ${interaction.id} was created!`);
};

export const name: string = "interaction";
