import { inject, injectable } from 'tsyringe';
import { HttpService } from './http.service';

@injectable()
export class IdentifyService {
  constructor(
    @inject(HttpService) private httpService: HttpService,
  ) {}

  namespace = '/identify';

  createContact(createOrderPayload: any) {
    const payload = {
      email: createOrderPayload['email'] ? createOrderPayload['email'] : null,
      phoneNumber: createOrderPayload['phoneNumber'] ? createOrderPayload['phoneNumber'] : null
    };
    return this.httpService.post(`${this.namespace}/`, payload);
  }


}

