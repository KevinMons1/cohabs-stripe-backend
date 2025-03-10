import { Module } from '@nestjs/common';
import { PaymentController } from './infrastructure/adapters/controllers/payment.controller';
import { I_PAYMENT_GATEWAY } from './ports/payment-gateway.port';
import { PayementStripeGateway } from './infrastructure/gateway/payement-stripe.gateway';
import { I_CONFIG_SERVICE } from '../core/ports/config-service.port';
import { CommonModule } from '../core/common.module';
import { CreatePaymentSessionUseCase } from './applications/usecases/create-payment-session.usecase';
import { I_ID_GENERATOR } from '../core/ports/id-generator.port';
import { I_RENTAL_REPOSITORY } from '../rentals/ports/rental-repository.port';
import { RentalModule } from '../rentals/rental.module';
import { I_LEASE_REPOSITORY } from '../leases/ports/lease-repository.port';
import { LeaseModule } from '../leases/lease.module';
import { ProductModule } from '../product/product.module';
import { I_PRODUCT_GATEWAY } from '../product/ports/product-gateway.port';
import { I_PAYMENT_REPOSITORY } from './ports/payment-repository.port';
import { MysqlPaymentRepository } from './infrastructure/adapters/mysql/mysql-lease-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentOrmEntity } from './infrastructure/adapters/orm/payment-orm.entity';
import { PaymentSucceededUseCase } from './applications/usecases/payment-succeeded.usecase';
import { CreatePaymentIntentUseCase } from './applications/usecases/create-payment-intent.usecase';
import { I_TENANT_REPOSITORY } from '../tenants/ports/tenant-repository.port';
import { TenantModule } from '../tenants/tenant.module';
import { GetPaymentIntentUseCase } from './applications/usecases/get-payment-intent.usecase';

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentOrmEntity]),
        CommonModule,
        LeaseModule,
        RentalModule,
        ProductModule,
        TenantModule,
    ],
    controllers: [PaymentController],
    providers: [
        {
            provide: I_PAYMENT_GATEWAY,
            inject: [I_CONFIG_SERVICE],
            useFactory: (configService) => {
                return new PayementStripeGateway(configService);
            },
        },
        {
            provide: I_PAYMENT_REPOSITORY,
            useClass: MysqlPaymentRepository,
        },
        {
            provide: CreatePaymentSessionUseCase,
            inject: [
                I_PAYMENT_GATEWAY,
                I_PRODUCT_GATEWAY,
                I_ID_GENERATOR,
                I_LEASE_REPOSITORY,
                I_RENTAL_REPOSITORY,
                I_PAYMENT_REPOSITORY,
            ],
            useFactory: (
                paymentGateway,
                productGateway,
                idGenerator,
                leaseRepository,
                rentalRepository,
                paymentRepository,
            ) => {
                return new CreatePaymentSessionUseCase(
                    paymentGateway,
                    productGateway,
                    idGenerator,
                    leaseRepository,
                    rentalRepository,
                    paymentRepository,
                );
            },
        },
        {
            provide: CreatePaymentIntentUseCase,
            inject: [
                I_PAYMENT_GATEWAY,
                I_TENANT_REPOSITORY,
                I_PAYMENT_REPOSITORY,
                I_PRODUCT_GATEWAY,
                I_RENTAL_REPOSITORY,
                I_LEASE_REPOSITORY,
                I_ID_GENERATOR,
            ],
            useFactory: (
                paymentGateway,
                tenantRepository,
                paymentRepository,
                productGateway,
                rentalRepository,
                leaseRepository,
                idGenerator,
            ) => {
                return new CreatePaymentIntentUseCase(
                    paymentGateway,
                    tenantRepository,
                    paymentRepository,
                    productGateway,
                    rentalRepository,
                    leaseRepository,
                    idGenerator,
                );
            },
        },
        {
            provide: PaymentSucceededUseCase,
            inject: [I_PAYMENT_REPOSITORY],
            useFactory: (paymentRepository) => {
                return new PaymentSucceededUseCase(paymentRepository);
            },
        },
        {
            provide: GetPaymentIntentUseCase,
            inject: [
                I_PAYMENT_GATEWAY,
                I_TENANT_REPOSITORY,
                I_PAYMENT_REPOSITORY,
            ],
            useFactory: (
                paymentGateway,
                tenantRepository,
                paymentRepository,
            ) => {
                return new GetPaymentIntentUseCase(
                    paymentGateway,
                    tenantRepository,
                    paymentRepository,
                );
            },
        },
    ],
    exports: [I_PAYMENT_REPOSITORY, PaymentSucceededUseCase],
})
export class PaymentModule {}
