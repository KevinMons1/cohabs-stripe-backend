import { Module } from '@nestjs/common';
import { WebhookController } from './infrastructure/adapters/controllers/webhook.controller';
import { I_WEBHOOK_EVENT_DISPATCHER } from './ports/webhook-event-dispatcher-service.port';
import { WebhookEventsDispatcherService } from './infrastructure/adapters/services/webhook-events-dispatcher.service';
import { PaymentIntentSucceededHandler } from './infrastructure/applications/handlers/payment-intent-succeeded.handler';
import { PaymentOrmEntity } from '../payments/infrastructure/adapters/orm/payment-orm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from '../payments/payment.module';
import { CommonModule } from '../core/common.module';
import { PaymentSucceededUseCase } from '../payments/applications/usecases/payment-succeeded.usecase';
import { I_WEBHOOK_EVENT_HANDLER } from './ports/checkout-succeeded-handler.port';

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentOrmEntity]),
        PaymentModule,
        CommonModule,
    ],
    controllers: [WebhookController],
    providers: [
        {
            provide: I_WEBHOOK_EVENT_DISPATCHER,
            inject: [I_WEBHOOK_EVENT_HANDLER],
            useFactory: (paymentIntentSucceededHandler) => {
                return new WebhookEventsDispatcherService(
                    paymentIntentSucceededHandler,
                );
            },
        },
        {
            provide: I_WEBHOOK_EVENT_HANDLER,
            inject: [PaymentSucceededUseCase],
            useFactory: (paymentSucceededUseCase) => {
                return new PaymentIntentSucceededHandler(
                    paymentSucceededUseCase,
                );
            },
        },
    ],
})
export class WebhookModule {}
