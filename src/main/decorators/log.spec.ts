import {Controller, httpRequest, httpResponse} from '../../presentation/protocols';
import {LogControllerDecorator} from './log';

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

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

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);

  return {
    controllerStub,
    sut
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
});
