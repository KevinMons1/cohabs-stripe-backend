import {
    BadRequestException,
    Controller,
    Headers,
    HttpCode,
    Inject,
    Post,
    RawBodyRequest,
    Req,
} from '@nestjs/common';
import Stripe from 'stripe';
import {
    I_CONFIG_SERVICE,
    IConfigService,
} from '../../../../core/ports/config-service.port';
import {
    I_WEBHOOK_EVENT_DISPATCHER,
    IWebhookEventDispatcher,
} from '../../../ports/webhook-event-dispatcher-service.port';

@Controller('webhook')
export class WebhookController {
    private readonly stripe: Stripe;

    constructor(
        @Inject(I_CONFIG_SERVICE)
        private readonly configService: IConfigService,
        @Inject(I_WEBHOOK_EVENT_DISPATCHER)
        private readonly webhookEventDispatcher: IWebhookEventDispatcher,
    ) {
        const privateKey = this.configService.get<string>('STRIPE_PRIVATE_KEY');
        this.stripe = new Stripe(privateKey, {
            apiVersion: '2025-02-24.acacia',
            typescript: true,
        });
    }

    @Post()
    @HttpCode(200)
    async handWebhook(
        @Headers('stripe-signature') signature: string,
        @Req() req: RawBodyRequest<Request>,
    ) {
        const secretWebhookKey =
            this.configService.get<string>('STRIPE_WEBHOOK');
        const payload = req.rawBody;

        try {
            const event = this.stripe.webhooks.constructEvent(
                payload,
                signature,
                secretWebhookKey,
            );

            this.webhookEventDispatcher.dispatch({
                type: event.type,
                id: event.id,
                data: {
                    id: (event.data.object as { id: string })?.id ?? '',
                },
            });
        } catch (error) {
            throw new BadRequestException('Invalid signature');
        }
    }
}
