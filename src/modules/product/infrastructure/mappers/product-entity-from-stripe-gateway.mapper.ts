import {Product} from "../../domain/entities/product.entity";
import Stripe from "stripe";

export class ProductEntityFromStripeGatewayMapper {
    static toDomainEntity(productData: Stripe.Product, priceData: Stripe.Price): Product {
        return new Product({
            id: productData.id,
            name: productData.name,
            price: priceData.unit_amount,
            currency: priceData.currency,
        });
    }
}
