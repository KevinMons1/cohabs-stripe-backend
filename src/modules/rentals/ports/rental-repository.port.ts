import { Rental } from '../domain/entities/rental.entity';
import { PaymentStatus } from '../../payments/domain/enums/payment-status.enum';

export const I_RENTAL_REPOSITORY = 'I_RENTAL_REPOSITORY';

export type RentalWithLeaseTenantAndPayments = Array<{
    rental: {
        rentalId: string;
    };
    tenant: {
        name: string;
    };
    payment: {
        updateAt: string;
        paymentStatus: PaymentStatus;
        amount: number;
    };
}>;

export interface IRentalRepository {
    findById(id: string): Promise<Rental | null>;
    findRentalPayments(
        id: string,
    ): Promise<RentalWithLeaseTenantAndPayments | null>;
}
