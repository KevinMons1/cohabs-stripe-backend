import { IWebhookEventDispatcher } from '../../../ports/webhook-event-dispatcher-service.port';
import { DispatcherEvent } from '../../../domain/interfaces/dispatcher-event.interface';
import { Events } from '../../../domain/enums/events.enum';
import { IWebhookEventHandler } from '../../../ports/checkout-succeeded-handler.port';

export class WebhookEventsDispatcherService implements IWebhookEventDispatcher {
    constructor(
        private readonly checkoutSucceededHandler: IWebhookEventHandler,
    ) {}

    async dispatch(event: DispatcherEvent): Promise<void> {
        if (event.type === Events.PaymentIntentCreated) {
            return await this.checkoutSucceededHandler.handle(event);
        }
    }
}
