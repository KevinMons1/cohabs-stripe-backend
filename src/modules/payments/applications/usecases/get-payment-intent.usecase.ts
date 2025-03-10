import { Executable } from '../../../../shared/executable';
import { IPaymentGateway } from '../../ports/payment-gateway.port';
import { IPaymentRepository } from '../../ports/payment-repository.port';
import { ITenantRepository } from '../../../tenants/ports/tenant-repository.port';

type Request = {
    tenantId: string;
};

type Response = {
    clientSecret: string;
};

export class GetPaymentIntentUseCase implements Executable<Request, Response> {
    constructor(
        private readonly paymentGateway: IPaymentGateway,
        private readonly tenantRepository: ITenantRepository,
        private readonly paymentRepository: IPaymentRepository,
    ) {}

    async execute({ tenantId }: Request): Promise<Response> {
        try {
            const payment =
                await this.paymentRepository.findOneByTenantId(tenantId);
            if (!payment) {
                throw new Error('Payment not found');
            }

            return {
                clientSecret: payment.props.clientSecret,
            };
        } catch (error) {
            throw new Error('Failed to get payment intent');
        }
    }
}
