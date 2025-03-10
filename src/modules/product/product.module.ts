import { Module } from '@nestjs/common';
import { I_PRODUCT_GATEWAY } from './ports/product-gateway.port';
import { ProductStripeGateway } from './infrastructure/gateway/product-stripe.gateway';
import { I_CONFIG_SERVICE } from '../core/ports/config-service.port';
import { CommonModule } from '../core/common.module';

@Module({
    imports: [CommonModule],
    providers: [
        {
            provide: I_PRODUCT_GATEWAY,
            inject: [I_CONFIG_SERVICE],
            useFactory: (configService) => {
                return new ProductStripeGateway(configService);
            },
        },
    ],
    exports: [I_PRODUCT_GATEWAY],
})
export class ProductModule {}
