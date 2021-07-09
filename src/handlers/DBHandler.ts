import { createConnection, Connection } from 'typeorm';
import { ORMConfig } from '../lib/ormconfig';

export const DBHandler = async (): Promise<void> => {
   const connection: Connection = await createConnection(
      ORMConfig
   );
   console.log(connection.name);
};
