import {httpRequest, httpResponse, Controller, EmailValidator} from '../protocols';
import {badRequest, serverError} from '../helpers/http-helper';
import {MissingParamError, InvalidParamError} from '../errors';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle (httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
      }

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidParamError('email'));
      }

      return {
        statusCode: 200,
        body: {}
      };
    } catch (error) {
      return serverError();
    }
  }
}
