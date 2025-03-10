import { Executable } from '../../../../shared/executable';
import { IRentalRepository } from '../../ports/rental-repository.port';
import { PaymentStatus } from '../../../payments/domain/enums/payment-status.enum';

type Request = {
    id: string;
};

type Response = {
    rentalPayments: Array<{
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
};

export class GetRentalPaymentsUseCase implements Executable<Request, Response> {
    constructor(private readonly rentalRepository: IRentalRepository) {}

    async execute(data: Request): Promise<Response> {
        const rental = await this.rentalRepository.findRentalPayments(data.id);
        if (!rental) {
            throw new Error('Rental not found');
        }

        return {
            rentalPayments: rental,
        };
    }
}
