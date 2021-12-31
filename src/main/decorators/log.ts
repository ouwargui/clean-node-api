import {Controller, httpRequest, httpResponse} from '../../presentation/protocols';

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;

  constructor (controller: Controller) {
    this.controller = controller;
  }

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    return await this.controller.handle(httpRequest);
  }
}
