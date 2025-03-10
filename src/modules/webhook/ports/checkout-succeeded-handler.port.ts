import { DispatcherEvent } from '../domain/interfaces/dispatcher-event.interface';

export const I_WEBHOOK_EVENT_HANDLER = 'I_WEBHOOK_EVENT_HANDLER';

export interface IWebhookEventHandler {
    handle(event: DispatcherEvent): Promise<void>;
}
