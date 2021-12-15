import {httpRequest, httpResponse, Controller, EmailValidator, AddAccount} from './signup-protocols';
import {badRequest, serverError} from '../../helpers/http-helper';
import {MissingParamError, InvalidParamError} from '../../errors';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
      }

      const {name, email, password, passwordConfirmation} = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = this.addAccount.add({
        name: name,
        email: email,
        password: password
      });

      return {
        statusCode: 200,
        body: account
      };
    } catch (error) {
      return serverError();
    }
  }
}