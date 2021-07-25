import Command from '../../handlers/CommandHandler';
import { Winbi } from '../../client';

export default class Kick extends Command {
   public constructor(client: Winbi) {
      super(client, {
         name: 'kick',
         aliases: ['boot'],
         desc: 'Kick any member from the server.',
         perms: ['SEND_MESSAGES', 'KICK_MEMBERS'],
         cooldown: 10,
         category: 'moderation',
         usage: '<prefix>kick <member> <optional reason>',
         run: async (client, message) => {
            message.channel.send('hi');
         }
      });
   }
}
