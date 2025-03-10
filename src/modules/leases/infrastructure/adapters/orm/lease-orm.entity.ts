import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from "typeorm";
import {TenantOrmEntity} from "../../../../tenants/infrastructure/adapters/orm/tenant-orm.entity";
import {RentalOrmEntity} from "../../../../rentals/infrastructure/adapters/orm/rental-orm.entity";

@Entity('lease')
export class LeaseOrmEntity {
    @Column('uuid', { primary: true })
    id: string;

    @OneToOne(() => TenantOrmEntity, (tenant) => tenant.lease)
    @JoinColumn({ name: 'tenant_id' })
    tenant: TenantOrmEntity;

    @ManyToOne(() => RentalOrmEntity, (rental) => rental.leases)
    @JoinColumn({ name: 'rental_id' })
    rental: RentalOrmEntity;
}
