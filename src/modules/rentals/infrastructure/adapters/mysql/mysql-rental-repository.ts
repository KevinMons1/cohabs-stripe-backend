import { Repository } from 'typeorm';
import { RentalOrmEntity } from '../orm/rental-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
    IRentalRepository,
    RentalWithLeaseTenantAndPayments,
} from '../../../ports/rental-repository.port';
import { Rental } from '../../../domain/entities/rental.entity';
import { RentalEntityFromOrmMapper } from '../../mappers/rental-entity-from-orm.mapper';
import { PaymentStatus } from '../../../../payments/domain/enums/payment-status.enum';

type RentalPaymentsQueryResult = Array<{
    rental_rentalId: string;
    tenant_name: string;
    payment_updated_at: string;
    payment_status: string;
    payment_amount: number;
}>;

export class MysqlRentalRepository implements IRentalRepository {
    constructor(
        @InjectRepository(RentalOrmEntity)
        readonly rentalRepository: Repository<RentalOrmEntity>,
    ) {}

    async findById(id: string): Promise<Rental | null> {
        try {
            const rentalOrm = await this.rentalRepository.findOneBy({
                id,
            });
            return rentalOrm
                ? RentalEntityFromOrmMapper.toDomainEntity(rentalOrm)
                : null;
        } catch (error) {
            throw new Error('Failed to find tenant by id');
        }
    }

    async findRentalPayments(
        id: string,
    ): Promise<RentalWithLeaseTenantAndPayments | null> {
        try {
            let rentalOrm: RentalPaymentsQueryResult =
                await this.rentalRepository
                    .createQueryBuilder('rental')
                    .leftJoin('rental.leases', 'lease')
                    .leftJoin('lease.tenant', 'tenant')
                    .leftJoin('tenant.payments', 'payment')
                    .select([
                        'rental.id AS rental_rentalId',
                        'tenant.name AS tenant_name',
                        'payment.updated_at AS payment_updated_at',
                        'payment.status AS payment_status',
                        'payment.amount AS payment_amount',
                    ])
                    .where('rental.id = :id', { id })
                    .getRawMany();

            rentalOrm = rentalOrm.filter((row) => row.payment_status !== null);

            return this.mapToRentalWithLeaseTenantAndPayments(rentalOrm);
        } catch (error) {
            console.log(error);
            throw new Error('Failed to find rental by id');
        }
    }

    private mapToRentalWithLeaseTenantAndPayments(
        result: RentalPaymentsQueryResult,
    ): RentalWithLeaseTenantAndPayments {
        return result.map((row) => ({
            rental: { rentalId: row.rental_rentalId },
            tenant: { name: row.tenant_name },
            payment: {
                updateAt: row.payment_updated_at,
                paymentStatus: row.payment_status as PaymentStatus,
                amount: row.payment_amount,
            },
        }));
    }
}
