import { Winbi } from '../../client';
import { Command } from '../../handlers/CmdEvtHandler';

export default class Balance extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'play',
         desc: 'Play some music.',
         perms: ['SEND_MESSAGES'],
         cooldown: 10,
         category: 'currency',
         usage: '<prefix>play',
         run: async (client, interaction, args) => {
            await client.MusicHandler.play(
               interaction,
               args.join(' ')
            );
         }
      });
   }
}
