import {DispatcherEvent} from "../domain/interfaces/dispatcher-event.interface";

export const I_WEBHOOK_EVENT_DISPATCHER = 'I_WEBHOOK_EVENT_DISPATCHER';

export interface IWebhookEventDispatcher {
    dispatch(event: DispatcherEvent): void;
}
