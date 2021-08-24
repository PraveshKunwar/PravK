import { PravK } from './client';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
   const client = new PravK();
   client.start(process.env.TOKEN as string);
   await client.Reminder.loadHelperSession();
})();
