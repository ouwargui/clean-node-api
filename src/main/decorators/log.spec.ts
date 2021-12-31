import {LogErrorRepository} from '../../data/protocols/log-error-repository';
import {serverError} from '../../presentation/helpers/http-helper';
import {Controller, httpRequest, httpResponse} from '../../presentation/protocols';
import {LogControllerDecorator} from './log';

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: httpRequest): Promise<httpResponse> {
      const httpResponse: httpResponse = {
        statusCode: 200,
        body: {
          name: 'any_name'
        }
      };
      return new Promise(resolve => resolve(httpResponse));
    }
  }
  return new ControllerStub();
};

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new LogErrorRepositoryStub();
};

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);

  return {
    controllerStub,
    sut,
    logErrorRepositoryStub
  };
};

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const {sut, controllerStub} = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest: httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('should return the same result of the controller', async () => {
    const {sut} = makeSut();

    const httpRequest: httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name'
      }
    });
  });

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const {sut, controllerStub, logErrorRepositoryStub} = makeSut();
    const fakeError = new Error();
    fakeError.stack = 'any_stack';

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');

    const error = serverError(fakeError);
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)));

    const httpRequest: httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };

    await sut.handle(httpRequest);
    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
