import { ITenantGateway } from '../../ports/tenant-gateway.port';
import Stripe from 'stripe';
import { IConfigService } from '../../../core/ports/config-service.port';

export class TenantStripeGateway implements ITenantGateway {
    private readonly stripe: Stripe;

    constructor(private readonly configService: IConfigService) {
        const privateKey = this.configService.get<string>('STRIPE_PRIVATE_KEY');
        this.stripe = new Stripe(privateKey, {
            apiVersion: '2025-02-24.acacia',
            typescript: true,
        });
    }

    async createTenant(name: string, email: string): Promise<string> {
        try {
            const customer = await this.stripe.customers.create({
                email: email,
                name: name,
            });
            return customer.id;
        } catch (error) {
            throw new Error('Failed to create tenant');
        }
    }
}
