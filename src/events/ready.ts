import { PravK } from '../client';
import { Event } from '../handlers/CmdEvtHandler';

export default class Ready extends Event {
   public constructor(client: PravK) {
      super(client, {
         name: 'ready',
         run: async (client) => {
            if (client.slashCommands) {
               client.application.commands.set(
                  client.slashCommands
               );
            }
            client.logger.success(
               `${client.user.tag} is online!`
            );

            client.user.setPresence({
               activities: [
                  {
                     name: 'Type @PravK !!',
                     type: 'PLAYING'
                  }
               ],
               status: 'dnd'
            });
         }
      });
   }
}
