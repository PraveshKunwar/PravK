import mongoose from 'mongoose';

export default class DBHandler {
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
         console.log('Database has been connected.');
      });
      mongoose.connection.on('disconnected', () => {
         console.log('Database has been disconnected.');
      });
      mongoose.connection.on('error', (err) => {
         console.error(`Error: ${err.stack}`);
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
