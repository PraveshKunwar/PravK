import { Winbi } from '../../client';
import { Command } from '../../handlers/CmdEvtHandler';

export default class Balance extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'bal',
         aliases: ['balance', 'account'],
         desc: 'Check your balanace',
         perms: ['SEND_MESSAGES'],
         cooldown: 10,
         category: 'currency',
         usage: '<prefix>balance',
         slashCommandOptions: {
            name: 'balance',
            description: 'Get your current balance.',
            options: [
               {
                  name: 'bal-user',
                  type: 'USER',
                  description:
                     'user who is going to be mentioned.'
               }
            ]
         },
         run: async (client, interaction, args) => {
            const t =
               interaction.options.get("bal-user'").value;
            await interaction.reply({
               ephemeral: true,
               content: `hhihihhihi \n\nval: ${t}`
            });
         }
      });
   }
}
