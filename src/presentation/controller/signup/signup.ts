import {httpRequest, httpResponse, Controller, EmailValidator, AddAccount, Validation} from './signup-protocols';
import {badRequest, ok, serverError} from '../../helpers/http-helper';
import {InvalidParamError} from '../../errors';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;
  private readonly validation: Validation;

  constructor (emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
    this.validation = validation;
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) return badRequest(error);

      const {name, email, password, passwordConfirmation} = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({
        name: name,
        email: email,
        password: password
      });

      return ok(account);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
