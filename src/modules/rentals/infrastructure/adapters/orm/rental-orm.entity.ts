import {Column, Entity, OneToMany} from "typeorm";
import {LeaseOrmEntity} from "../../../../leases/infrastructure/adapters/orm/lease-orm.entity";

@Entity('rental')
export class RentalOrmEntity {
    @Column('uuid', { primary: true })
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    currency: string;

    @Column()
    city: string;

    @Column({ name: 'product_id' })
    productId: string;

    @OneToMany(() => LeaseOrmEntity, (lease) => lease.rental)
    leases: LeaseOrmEntity;
}
