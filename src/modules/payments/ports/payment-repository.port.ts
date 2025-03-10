import { Payment } from '../domain/entities/payment.entity';

export const I_PAYMENT_REPOSITORY = 'I_PAYMENT_REPOSITORY';

export interface IPaymentRepository {
    findByExternalId(id: string): Promise<Payment | null>;
    findOneByTenantId(id: string): Promise<Payment | null>;
    create(lease: Payment): Promise<void>;
    update(lease: Payment): Promise<void>;
}
