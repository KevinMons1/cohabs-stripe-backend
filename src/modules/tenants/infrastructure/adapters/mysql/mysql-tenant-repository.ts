import { ITenantRepository } from '../../../ports/tenant-repository.port';
import { Repository } from 'typeorm';
import { TenantOrmEntity } from '../orm/tenant-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from '../../../domain/entities/tenant.entity';
import { TenantEntityFromOrmMapper } from '../../mappers/tenant-entity-from-orm.mapper';

export class MysqlTenantRepository implements ITenantRepository {
    constructor(
        @InjectRepository(TenantOrmEntity)
        readonly tenantRepository: Repository<TenantOrmEntity>,
    ) {}

    async findById(id: string): Promise<Tenant | null> {
        try {
            const tenantorm = await this.tenantRepository.findOneBy({
                id,
            });
            return tenantorm
                ? TenantEntityFromOrmMapper.toDomainEntity(tenantorm)
                : null;
        } catch (error) {
            throw new Error('Failed to find tenant by id');
        }
    }

    async findByIds(ids: string[]): Promise<Tenant[]> {
        try {
            const tenantOrm = await this.tenantRepository.findByIds(ids);
            return tenantOrm
                ? tenantOrm.map((tenantorm) =>
                      TenantEntityFromOrmMapper.toDomainEntity(tenantorm),
                  )
                : [];
        } catch (error) {
            throw new Error('Failed to find tenant by id');
        }
    }

    async findByEmail(email: string): Promise<Tenant | null> {
        try {
            const tenantOrm = await this.tenantRepository.findOne({
                where: {
                    email,
                },
            });
            console.log(email);
            return tenantOrm
                ? TenantEntityFromOrmMapper.toDomainEntity(tenantOrm)
                : null;
        } catch (error) {
            throw new Error('Failed to find tenant by id');
        }
    }

    async create(tenant: Tenant): Promise<void> {
        try {
            const tenantOrm = TenantEntityFromOrmMapper.toOrmEntity(tenant);
            await this.tenantRepository.save(tenantOrm);
        } catch (error) {
            throw new Error('Failed to create tenant');
        }
    }
}
