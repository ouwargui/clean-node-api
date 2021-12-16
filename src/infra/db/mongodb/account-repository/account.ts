import {AddAccountRepository} from '../../../../data/protocols/add-account-repository';
import {AccountModel} from '../../../../domain/models/account';
import {AddAccountModel} from '../../../../domain/usecases/add-account';
import {MongoHelper} from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const collection = MongoHelper.getCollection('accounts');
    const result = await collection.insertOne(account);
    const insertedId = result.insertedId;

    const {_id, ...accountWithoutId} = await collection.findOne({_id: insertedId}) as any;

    return Object.assign({}, accountWithoutId, {id: _id});
  }
}
