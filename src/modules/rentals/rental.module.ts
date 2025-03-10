import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I_RENTAL_REPOSITORY } from './ports/rental-repository.port';
import { MysqlRentalRepository } from './infrastructure/adapters/mysql/mysql-rental-repository';
import { RentalOrmEntity } from './infrastructure/adapters/orm/rental-orm.entity';
import { RentalController } from './infrastructure/adapters/controllers/rental.controller';
import { GetRentalPaymentsUseCase } from './applications/usecases/get-rental-payments.usecase';
import { GetTenantsUseCase } from './applications/usecases/get-tenants.usecase';
import { I_LEASE_REPOSITORY } from '../leases/ports/lease-repository.port';
import { I_TENANT_REPOSITORY } from '../tenants/ports/tenant-repository.port';
import { LeaseModule } from '../leases/lease.module';
import { TenantModule } from '../tenants/tenant.module';
import { AddTenantInRentalUsecase } from './applications/usecases/add-tenant-in-rental.usecase';
import { I_ID_GENERATOR } from '../core/ports/id-generator.port';
import { I_TENANT_GATEWAY } from '../tenants/ports/tenant-gateway.port';
import { CommonModule } from '../core/common.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RentalOrmEntity]),
        LeaseModule,
        TenantModule,
        CommonModule,
    ],
    controllers: [RentalController],
    providers: [
        {
            provide: I_RENTAL_REPOSITORY,
            useClass: MysqlRentalRepository,
        },
        {
            provide: GetRentalPaymentsUseCase,
            inject: [I_RENTAL_REPOSITORY],
            useFactory: (rentalRepository) => {
                return new GetRentalPaymentsUseCase(rentalRepository);
            },
        },
        {
            provide: GetTenantsUseCase,
            inject: [I_LEASE_REPOSITORY, I_TENANT_REPOSITORY],
            useFactory: (leaseRepository, tenantRepository) => {
                return new GetTenantsUseCase(leaseRepository, tenantRepository);
            },
        },
        {
            provide: AddTenantInRentalUsecase,
            inject: [
                I_TENANT_REPOSITORY,
                I_LEASE_REPOSITORY,
                I_ID_GENERATOR,
                I_TENANT_GATEWAY,
            ],
            useFactory: (
                tenantRepository,
                leaseRepository,
                idGenerator,
                tenantGateway,
            ) => {
                return new AddTenantInRentalUsecase(
                    tenantRepository,
                    leaseRepository,
                    idGenerator,
                    tenantGateway,
                );
            },
        },
    ],
    exports: [I_RENTAL_REPOSITORY],
})
export class RentalModule {}
