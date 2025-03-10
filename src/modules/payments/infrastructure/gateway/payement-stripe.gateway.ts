import {
    IPaymentGateway,
    PaymentIntent,
} from '../../ports/payment-gateway.port';
import Stripe from 'stripe';
import { IConfigService } from '../../../core/ports/config-service.port';

export class PayementStripeGateway implements IPaymentGateway {
    private readonly stripe: Stripe;

    constructor(private readonly configService: IConfigService) {
        const privateKey = this.configService.get<string>('STRIPE_PRIVATE_KEY');
        this.stripe = new Stripe(privateKey, {
            apiVersion: '2025-02-24.acacia',
            typescript: true,
        });
    }

    async createCheckoutSession(
        amount: number,
        currency: string,
        name: string,
    ): Promise<{
        sessionId: string;
        checkoutUrl: string;
    }> {
        try {
            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        quantity: 1,
                        price_data: {
                            currency,
                            product_data: {
                                name,
                            },
                            unit_amount: amount,
                        },
                    },
                ],
                mode: 'payment',
                success_url: 'http://localhost:5173',
                cancel_url: 'http://localhost:5173',
            });

            return {
                sessionId: session.id,
                checkoutUrl: session.url,
            };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create checkout session');
        }
    }

    async createPaymentIntent(
        amount: number,
        currency: string,
        customerId: string,
    ): Promise<PaymentIntent> {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency,
                customer: customerId,
            });

            return {
                id: paymentIntent.id,
                clientSecret: paymentIntent.client_secret,
            };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create payment intent');
        }
    }

    async getPaymentIntent(id: string): Promise<PaymentIntent | null> {
        try {
            const paymentIntent = await this.stripe.paymentIntents.retrieve(id);
            return paymentIntent
                ? this.mapToPaymentIntent(paymentIntent)
                : null;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to get payment intent');
        }
    }

    private mapToPaymentIntent(
        paymentIntent: Stripe.PaymentIntent,
    ): PaymentIntent {
        return {
            id: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
        };
    }
}
