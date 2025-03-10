import { Executable } from '../../../../shared/executable';
import { IPaymentGateway } from '../../ports/payment-gateway.port';
import { IIDGenerator } from '../../../core/ports/id-generator.port';
import { IRentalRepository } from '../../../rentals/ports/rental-repository.port';
import { ILeaseRepository } from '../../../leases/ports/lease-repository.port';
import { IProductGateway } from '../../../product/ports/product-gateway.port';
import { IPaymentRepository } from '../../ports/payment-repository.port';

type Request = {
    tenantId: string;
};

type Response = {
    checkoutUrl: string;
};

export class CreatePaymentSessionUseCase
    implements Executable<Request, Response>
{
    constructor(
        private readonly paymentGateway: IPaymentGateway,
        private readonly productGateway: IProductGateway,
        private readonly idGenerator: IIDGenerator,
        private readonly leaseRepository: ILeaseRepository,
        private readonly rentalRepository: IRentalRepository,
        private readonly paymentRepository: IPaymentRepository,
    ) {}

    async execute(data: Request): Promise<Response> {
        return {
            checkoutUrl: 'http://localhost:5173',
        };
        // try {
        //     const lease = await this.leaseRepository.findOneByTenantId(
        //         data.tenantId,
        //     );
        //     const rental = await this.rentalRepository.findById(
        //         lease.props.rentalId,
        //     );
        //     const product = await this.productGateway.findProductById(
        //         rental.props.productId,
        //     );
        //     const session = await this.paymentGateway.createCheckoutSession(
        //         product.props.price,
        //         product.props.currency,
        //         product.props.name,
        //     );
        //
        //     const paymentId = this.idGenerator.generate();
        //     const payment = new Payment({
        //         id: paymentId,
        //         ownerId: data.tenantId,
        //         externalId: session.sessionId,
        //         amount: product.props.price,
        //         currency: product.props.currency,
        //         status: PaymentStatus.Pending,
        //         clientSecret: ,
        //     });
        //
        //     await this.paymentRepository.create(payment);
        //
        //     return {
        //         checkoutUrl: session.checkoutUrl,
        //     };
        // } catch (error) {
        //     throw error;
        // }
    }
}
