import {MongoHelper} from '../infra/db/mongodb/helpers/mongo-helper';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.log('mongodb connected');
    const app = (await import('./config/app')).default;
    app.listen(env.port, () => console.log(`server running at http://localhost:${env.port}`));
  })
  .catch(console.error);
