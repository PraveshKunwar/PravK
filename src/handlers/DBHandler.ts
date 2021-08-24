import mongoose from 'mongoose';
import { PravK } from '../client';

export default class DBHandler {
   private client: PravK;
   public constructor(client: PravK) {
      this.client = client;
   }
   public options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      poolSize: 5
   };
   public async connect(uri: string): Promise<void> {
      mongoose.connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      mongoose.connection.on('connected', () => {
         this.client.logger.success(
            'Database has been connected.'
         );
      });
      mongoose.connection.on('disconnected', () => {
         this.client.logger.success(
            'Database has been disconnected.'
         );
      });
      mongoose.connection.on('error', (err) => {
         this.client.logger.error(
            new Error(`Error: ${err.stack}`)
         );
      });
   }
   public async findOneBy(
      toFindBy: Record<string, unknown>,
      model: mongoose.Model<mongoose.Document>
   ): Promise<
      mongoose.Document<unknown, unknown, unknown>
   > {
      return await model.findOne(toFindBy);
   }
}
