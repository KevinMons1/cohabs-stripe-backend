import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantOrmEntity } from './infrastructure/adapters/orm/tenant-orm.entity';
import { I_TENANT_REPOSITORY } from './ports/tenant-repository.port';
import { MysqlTenantRepository } from './infrastructure/adapters/mysql/mysql-tenant-repository';
import { I_TENANT_GATEWAY } from './ports/tenant-gateway.port';
import { I_CONFIG_SERVICE } from '../core/ports/config-service.port';
import { TenantStripeGateway } from './infrastructure/gateway/tenant-stripe.gateway';
import { CommonModule } from '../core/common.module';
import { LoginUseCase } from './applications/usecases/login.usecase';
import { TenantController } from './infrastructure/adapters/controllers/tenant.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TenantOrmEntity]), CommonModule],
    controllers: [TenantController],
    providers: [
        {
            provide: I_TENANT_REPOSITORY,
            useClass: MysqlTenantRepository,
        },
        {
            provide: I_TENANT_GATEWAY,
            inject: [I_CONFIG_SERVICE],
            useFactory: (configService) => {
                return new TenantStripeGateway(configService);
            },
        },
        {
            provide: LoginUseCase,
            inject: [I_TENANT_REPOSITORY],
            useFactory: (tenantRepository) => {
                return new LoginUseCase(tenantRepository);
            },
        },
    ],
    exports: [I_TENANT_REPOSITORY, I_TENANT_GATEWAY],
})
export class TenantModule {}
