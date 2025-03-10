export const I_PAYMENT_GATEWAY = 'PAYMENT_GATEWAY_PORT';

export type PaymentIntent = {
    id: string;
    clientSecret: string;
};

export interface IPaymentGateway {
    createCheckoutSession(
        amount: number,
        currency: string,
        name: string,
    ): Promise<{
        sessionId: string;
        checkoutUrl: string;
    }>;
    createPaymentIntent(
        amount: number,
        currency: string,
        customerId: string,
    ): Promise<PaymentIntent>;
    getPaymentIntent(id: string): Promise<PaymentIntent | null>;
}
