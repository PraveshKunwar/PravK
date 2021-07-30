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
         usage: '<prefix>balance'
      });
   }
}
