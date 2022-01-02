import {Collection} from 'mongodb';
import {MongoHelper} from '../helpers/mongo-helper';
import {LogMongoRepository} from './log';

let errorsCollection: Collection;

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL as string);
});

afterAll(async () => {
  await MongoHelper.disconnect();
});

beforeEach(async () => {
  errorsCollection = await MongoHelper.getCollection('errors');
  await errorsCollection.deleteMany({});
});

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

describe('Log Mongo Repository', () => {
  test('should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError('any_error');
    const count = await errorsCollection.countDocuments();
    expect(count).toBe(1);
  });
});
