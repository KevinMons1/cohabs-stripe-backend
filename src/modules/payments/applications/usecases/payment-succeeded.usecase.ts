import { IPaymentRepository } from '../../ports/payment-repository.port';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { Executable } from '../../../../shared/executable';

type Request = {
    id: string;
};

type Response = void;

export class PaymentSucceededUseCase implements Executable<Request, Response> {
    constructor(private readonly paymentRepository: IPaymentRepository) {}

    async execute({ id }: Request): Promise<Response> {
        const payment = await this.paymentRepository.findByExternalId(id);
        if (!payment) {
            throw new Error('Payment not found');
        }

        payment.props.status = PaymentStatus.Succeeded;

        await this.paymentRepository.update(payment);
    }
}
