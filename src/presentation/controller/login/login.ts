import {Authentication} from '../../../domain/usecases/authentication';
import {InvalidParamError, MissingParamError} from '../../errors';
import {badRequest, serverError} from '../../helpers/http-helper';
import {Controller, httpRequest, httpResponse} from '../../protocols';
import {EmailValidator} from '../signup/signup-protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const {email, password} = httpRequest.body;

      if (!email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))));
      }
      if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))));
      }
      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))));
      };
      await this.authentication.auth(email, password);
      return new Promise(resolve => resolve(badRequest(new MissingParamError('name'))));
    } catch (error: any) {
      return serverError(error);
    }
  }
}
