import { PravK } from '../../client';
import { Command } from '../../handlers/CmdEvtHandler';

export default class Balance extends Command {
   public constructor(client: PravK) {
      super(client, {
         name: 'play',
         desc: 'Play some music.',
         perms: ['SEND_MESSAGES'],
         cooldown: 10,
         category: 'currency',
         usage: '<prefix>play',
         run: async (client, interaction, args) => {
            console.log(2);
         }
      });
   }
}
