import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentOrmEntity } from '../orm/payment-orm.entity';
import { IPaymentRepository } from '../../../ports/payment-repository.port';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentEntityFromOrmMapper } from '../../mappers/payment-entity-from-orm.mapper';

export class MysqlPaymentRepository implements IPaymentRepository {
    constructor(
        @InjectRepository(PaymentOrmEntity)
        readonly paymentRepository: Repository<PaymentOrmEntity>,
    ) {}

    async findByExternalId(id: string): Promise<Payment | null> {
        try {
            const paymentOrm = await this.paymentRepository.findOne({
                where: {
                    externalId: id,
                },
                relations: ['tenant'],
            });
            return paymentOrm
                ? PaymentEntityFromOrmMapper.toDomainEntity(paymentOrm)
                : null;
        } catch (error) {
            throw new Error('Failed to find by externalId');
        }
    }

    async findOneByTenantId(id: string): Promise<Payment | null> {
        try {
            const paymentOrm = await this.paymentRepository.findOne({
                where: {
                    tenant: {
                        id,
                    },
                },
                relations: ['tenant'],
            });
            return paymentOrm
                ? PaymentEntityFromOrmMapper.toDomainEntity(paymentOrm)
                : null;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to find by externalId');
        }
    }

    async create(payment: Payment): Promise<void> {
        try {
            const paymentOrm = PaymentEntityFromOrmMapper.toOrmEntity(payment);
            await this.paymentRepository.save(paymentOrm);
        } catch (error) {
            throw new Error('Failed to create payment');
        }
    }

    async update(payment: Payment): Promise<void> {
        try {
            const paymentOrm = PaymentEntityFromOrmMapper.toOrmEntity(payment);
            await this.paymentRepository.save(paymentOrm);
        } catch (error) {
            throw new Error('Failed to update payment');
        }
    }
}
