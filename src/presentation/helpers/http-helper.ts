import {ServerError} from '../errors';
import {UnauthorizedError} from '../errors/unauthorized-error';
import {httpResponse} from '../protocols/http';

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error
});

export const serverError = (error: Error): httpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack as string)
});

export const unauthorized = (): httpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
});

export const ok = (data: any): httpResponse => ({
  statusCode: 200,
  body: data
});
