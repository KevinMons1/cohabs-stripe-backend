import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaseOrmEntity } from './infrastructure/adapters/orm/lease-orm.entity';
import { I_LEASE_REPOSITORY } from './ports/lease-repository.port';
import { MysqlLeaseRepository } from './infrastructure/adapters/mysql/mysql-lease-repository';

@Module({
    imports: [TypeOrmModule.forFeature([LeaseOrmEntity])],
    providers: [
        {
            provide: I_LEASE_REPOSITORY,
            useClass: MysqlLeaseRepository,
        },
    ],
    exports: [I_LEASE_REPOSITORY],
})
export class LeaseModule {}
