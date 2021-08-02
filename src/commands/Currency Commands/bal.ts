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
         usage: '/balance',
         slashCommandOptions: {
            name: 'balance',
            description: 'Get your current balance.',
            defaultPermission: true,
            options: [
               {
                  name: 'bal_user',
                  type: 'USER',
                  description:
                     'user who is going to be mentioned.'
               }
            ]
         },
         run: async (client, interaction, args) => {
            const [bal_user] = args;
            await interaction.reply({
               ephemeral: true,
               content: `hhihihhihi \n\n value: ${bal_user}`
            });
         }
      });
   }
}
