import { Interaction, MessageActionRow, MessageButton } from "discord.js";
import { EventFunc } from "../typedefs/commandEvent";

export const run: EventFunc = async (client, interaction: Interaction) => {
  
  console.log(`interaction with id ${interaction.id} was created!`);
  if(!interaction.isCommand()) return;
  if(interaction.commandName === "test"){
    const row = new MessageActionRow().addComponents(new MessageButton().setCustomID("primary").setLabel("primary").setStyle("PRIMARY"))
    await interaction.reply({content: "bruh", components: [row]})
  }
};

export const name: string = "interaction";
