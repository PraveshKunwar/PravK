import { Winbi } from './client';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
   const client = new Winbi();
   client.start(process.env.TOKEN as string);
   await client.Reminder.loadHelperSession();
})();
