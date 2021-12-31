import request from 'supertest';
import {MongoHelper} from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

beforeAll(async () => {
  await MongoHelper.connect(process.env.MONGO_URL as string);
});

afterAll(async () => {
  await MongoHelper.disconnect();
});

beforeEach(async () => {
  const accountsCollection = await MongoHelper.getCollection('accounts');
  await accountsCollection.deleteMany({});
});

describe('Signup Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200);
  });
});
