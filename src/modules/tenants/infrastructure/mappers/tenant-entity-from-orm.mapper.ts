import { TenantOrmEntity } from '../adapters/orm/tenant-orm.entity';
import { Tenant } from '../../domain/entities/tenant.entity';

export class TenantEntityFromOrmMapper {
    static toDomainEntity(ormEntity: TenantOrmEntity): Tenant {
        return new Tenant({
            id: ormEntity.id,
            name: ormEntity.name,
            email: ormEntity.email,
            customerId: ormEntity.customerId,
        });
    }

    static toOrmEntity(tenant: Tenant): TenantOrmEntity {
        const ormEntity = new TenantOrmEntity();
        ormEntity.id = tenant.props.id;
        ormEntity.name = tenant.props.name;
        ormEntity.email = tenant.props.email;
        ormEntity.customerId = tenant.props.customerId;
        return ormEntity;
    }
}
