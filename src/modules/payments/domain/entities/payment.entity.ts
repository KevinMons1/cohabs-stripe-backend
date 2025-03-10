import { Entity } from '../../../../shared/entity';
import { PaymentStatus } from '../enums/payment-status.enum';

interface PaymentEntityProps {
    id: string;
    ownerId: string;
    externalId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    clientSecret: string;
}

export class Payment extends Entity<PaymentEntityProps> {}
