import { Winbi } from '../client';
import { Event } from '../handlers/CmdEvtHandler';

export default class Ready extends Event {
   public constructor(client: Winbi) {
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
                     name: 'Type @Winbi !!',
                     type: 'PLAYING'
                  }
               ],
               status: 'dnd'
            });
         }
      });
   }
}
