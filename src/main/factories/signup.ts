import {DbAddAccount} from '../../data/usecases/add-account/db-add-account';
import {SignUpController} from '../../presentation/controller/signup/signup';
import {EmailValidatorAdapter} from '../../utils/email-validator-adapter';
import {BcryptAdapter} from '../../infra/criptography/bcrypt-adapter';
import {AccountMongoRepository} from '../../infra/db/mongodb/account-repository/account';
import {Controller} from '../../presentation/protocols';
import {LogControllerDecorator} from '../decorators/log';

export const makeSignUpController = (): Controller => {
  const SALT = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(SALT);
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  return new LogControllerDecorator(new SignUpController(emailValidatorAdapter, dbAddAccount));
};
