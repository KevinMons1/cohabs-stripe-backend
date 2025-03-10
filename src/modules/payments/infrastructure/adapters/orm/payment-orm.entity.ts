import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
} from 'typeorm';
import { TenantOrmEntity } from '../../../../tenants/infrastructure/adapters/orm/tenant-orm.entity';
import { PaymentStatus } from '../../../domain/enums/payment-status.enum';

@Entity('payment')
export class PaymentOrmEntity {
    @Column('uuid', { primary: true })
    id: string;

    @Column({ name: 'external_session_id' })
    externalId: string | null;

    @Column()
    amount: number;

    @Column()
    currency: string;

    @Column()
    status: PaymentStatus;

    @Column({ name: 'client_secret' })
    clientSecret: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => TenantOrmEntity, (tenant) => tenant.payments)
    @JoinColumn({ name: 'tenant_id' })
    tenant: TenantOrmEntity;
}
