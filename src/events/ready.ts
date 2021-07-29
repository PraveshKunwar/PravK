import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (client) => {
   client.logger.success(`${client.user.tag} is online!`);
   await client.Reminder.loadHelperSession();
   client.user.setPresence({
      activities: [
         {
            name: 'Type @Winbi !!',
            type: 'PLAYING'
         }
      ],
      status: 'dnd'
   });
};

export const name = 'ready';
