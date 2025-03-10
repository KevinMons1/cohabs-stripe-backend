import { PaymentOrmEntity } from '../adapters/orm/payment-orm.entity';
import { Payment } from '../../domain/entities/payment.entity';
import { TenantOrmEntity } from '../../../tenants/infrastructure/adapters/orm/tenant-orm.entity';

export class PaymentEntityFromOrmMapper {
    static toOrmEntity(payment: Payment): PaymentOrmEntity {
        const paymentOrmEntity = new PaymentOrmEntity();
        paymentOrmEntity.id = payment.props.id;
        paymentOrmEntity.externalId = payment.props.externalId;
        paymentOrmEntity.amount = payment.props.amount;
        paymentOrmEntity.currency = payment.props.currency;
        paymentOrmEntity.status = payment.props.status;
        paymentOrmEntity.clientSecret = payment.props.clientSecret;

        paymentOrmEntity.tenant = new TenantOrmEntity();
        paymentOrmEntity.tenant.id = payment.props.ownerId;

        return paymentOrmEntity;
    }

    static toDomainEntity(ormEntity: PaymentOrmEntity): Payment {
        return new Payment({
            id: ormEntity.id,
            ownerId: ormEntity.tenant.id,
            externalId: ormEntity.externalId,
            amount: ormEntity.amount,
            currency: ormEntity.currency,
            status: ormEntity.status,
            clientSecret: ormEntity.clientSecret,
        });
    }
}
