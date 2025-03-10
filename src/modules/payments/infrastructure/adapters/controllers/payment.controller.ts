import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePaymentSessionUseCase } from '../../../applications/usecases/create-payment-session.usecase';
import { CheckoutDto, PaymentIntentDto } from '../dto/checkout.dto';
import { CreatePaymentIntentUseCase } from '../../../applications/usecases/create-payment-intent.usecase';
import { GetPaymentIntentUseCase } from '../../../applications/usecases/get-payment-intent.usecase';

@Controller('payments')
export class PaymentController {
    constructor(
        private readonly createPaymentSessionUseCase: CreatePaymentSessionUseCase,
        private readonly createPaymentIntentUseCase: CreatePaymentIntentUseCase,
        private readonly getPaymentIntentUseCase: GetPaymentIntentUseCase,
    ) {}

    @Post('checkout')
    async checkout(@Body() dto: CheckoutDto) {
        return this.createPaymentSessionUseCase.execute(dto);
    }

    @Post('payment-intent')
    async paymentIntent(@Body() dto: PaymentIntentDto) {
        return this.createPaymentIntentUseCase.execute(dto);
    }

    @Get('payment-intent/tenant/:tenantId')
    async getPaymentIntent(@Param() param: { tenantId: string }) {
        const { tenantId } = param;
        return await this.getPaymentIntentUseCase.execute({
            tenantId,
        });
    }
}
