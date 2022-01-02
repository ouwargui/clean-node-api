import {DbAddAccount} from '../../data/usecases/add-account/db-add-account';
import {SignUpController} from '../../presentation/controller/signup/signup';
import {EmailValidatorAdapter} from '../../utils/email-validator-adapter';
import {BcryptAdapter} from '../../infra/criptography/bcrypt-adapter';
import {AccountMongoRepository} from '../../infra/db/mongodb/account-repository/account';
import {Controller} from '../../presentation/protocols';
import {LogControllerDecorator} from '../decorators/log';
import {LogMongoRepository} from '../../infra/db/mongodb/log-repository/log';

export const makeSignUpController = (): Controller => {
  const SALT = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const accountMongoRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter(SALT);
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signupController = new SignUpController(emailValidatorAdapter, dbAddAccount);
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signupController, logMongoRepository);
};
