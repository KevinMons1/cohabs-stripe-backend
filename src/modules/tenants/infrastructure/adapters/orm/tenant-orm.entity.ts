import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { PaymentOrmEntity } from '../../../../payments/infrastructure/adapters/orm/payment-orm.entity';
import { LeaseOrmEntity } from '../../../../leases/infrastructure/adapters/orm/lease-orm.entity';

@Entity('tenant')
export class TenantOrmEntity {
    @Column('uuid', { primary: true })
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ name: 'customer_id' })
    customerId: string;

    @OneToMany(() => PaymentOrmEntity, (payment) => payment.tenant)
    payments: PaymentOrmEntity[];

    @OneToOne(() => LeaseOrmEntity, (lease) => lease.tenant)
    lease: LeaseOrmEntity;
}
