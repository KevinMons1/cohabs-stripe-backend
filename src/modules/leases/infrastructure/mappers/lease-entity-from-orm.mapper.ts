import { Lease } from '../../domain/entities/lease.entity';
import { LeaseOrmEntity } from '../adapters/orm/lease-orm.entity';
import { TenantOrmEntity } from '../../../tenants/infrastructure/adapters/orm/tenant-orm.entity';
import { RentalOrmEntity } from '../../../rentals/infrastructure/adapters/orm/rental-orm.entity';

export class LeaseEntityFromOrmMapper {
    static toOrmEntity(lease: Lease): LeaseOrmEntity {
        const ormEntity = new LeaseOrmEntity();
        ormEntity.id = lease.props.id;

        ormEntity.tenant = new TenantOrmEntity();
        ormEntity.tenant.id = lease.props.tenantId;

        ormEntity.rental = new RentalOrmEntity();
        ormEntity.rental.id = lease.props.rentalId;

        return ormEntity;
    }

    static toDomainEntity(ormEntity: LeaseOrmEntity): Lease {
        return new Lease({
            id: ormEntity.id,
            tenantId: ormEntity.tenant.id,
            rentalId: ormEntity.rental.id,
        });
    }
}
