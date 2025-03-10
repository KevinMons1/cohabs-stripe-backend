import {Product} from "../domain/entities/product.entity";

export const I_PRODUCT_GATEWAY = 'PRODUCT_GATEWAY_PORT';

export interface IProductGateway {
    findProductById(productId: string): Promise<Product | null>;
}
