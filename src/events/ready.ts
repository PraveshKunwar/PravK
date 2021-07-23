import { EventFunc } from '../typedefs/types';

export const run: EventFunc = async (client) => {
   client.logger.success(`${client.user.tag} is online!`);
   client.user.setPresence({
      activities: [
         {
            name: 'Currently coding myself!',
            type: 'PLAYING'
         }
      ],
      status: 'dnd'
   });
};

export const name = 'ready';
