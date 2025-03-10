import Stripe from 'stripe';
import { IConfigService } from '../../../core/ports/config-service.port';
import { IProductGateway } from '../../ports/product-gateway.port';
import { Product } from '../../domain/entities/product.entity';
import { ProductEntityFromStripeGatewayMapper } from '../mappers/product-entity-from-stripe-gateway.mapper';

export class ProductStripeGateway implements IProductGateway {
    private readonly stripe: Stripe;

    constructor(private readonly configService: IConfigService) {
        const privateKey = this.configService.get<string>('STRIPE_PRIVATE_KEY');
        this.stripe = new Stripe(privateKey, {
            apiVersion: '2025-02-24.acacia',
            typescript: true,
        });
    }

    async findProductById(productId: string): Promise<Product | null> {
        try {
            const product = await this.stripe.products.retrieve(productId);
            if (!product || typeof product.default_price !== 'string')
                return null;

            const price = await this.findPriceById(product.default_price);
            return ProductEntityFromStripeGatewayMapper.toDomainEntity(
                product,
                price,
            );
        } catch (error) {
            throw new Error('Failed to get product');
        }
    }

    private async findPriceById(priceId: string): Promise<Stripe.Price | null> {
        try {
            return await this.stripe.prices.retrieve(priceId);
        } catch (error) {
            throw new Error('Failed to get price');
        }
    }
}
