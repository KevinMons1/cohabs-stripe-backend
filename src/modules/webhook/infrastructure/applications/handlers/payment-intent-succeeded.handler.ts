import { IWebhookEventHandler } from '../../../ports/checkout-succeeded-handler.port';
import { PaymentSucceededUseCase } from '../../../../payments/applications/usecases/payment-succeeded.usecase';
import { DispatcherEvent } from '../../../domain/interfaces/dispatcher-event.interface';

export class PaymentIntentSucceededHandler implements IWebhookEventHandler {
    constructor(
        private readonly paymentSucceededUseCase: PaymentSucceededUseCase,
    ) {}

    async handle(event: DispatcherEvent): Promise<void> {
        return await this.paymentSucceededUseCase.execute({
            id: event.data.id,
        });
    }
}
