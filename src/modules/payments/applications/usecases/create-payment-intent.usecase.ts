import { Executable } from '../../../../shared/executable';
import { IPaymentGateway } from '../../ports/payment-gateway.port';
import { ITenantRepository } from '../../../tenants/ports/tenant-repository.port';
import { IPaymentRepository } from '../../ports/payment-repository.port';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';
import { Payment } from '../../domain/entities/payment.entity';
import { IProductGateway } from '../../../product/ports/product-gateway.port';
import { IIDGenerator } from '../../../core/ports/id-generator.port';
import { IRentalRepository } from '../../../rentals/ports/rental-repository.port';
import { ILeaseRepository } from '../../../leases/ports/lease-repository.port';

type Request = {
    tenantId: string;
};

type Response = void;

export class CreatePaymentIntentUseCase
    implements Executable<Request, Response>
{
    constructor(
        private readonly paymentGateway: IPaymentGateway,
        private readonly tenantRepository: ITenantRepository,
        private readonly paymentRepository: IPaymentRepository,
        private readonly productGateway: IProductGateway,
        private readonly rentalRepository: IRentalRepository,
        private readonly leaseRepository: ILeaseRepository,
        private readonly idGenerator: IIDGenerator,
    ) {}

    async execute({ tenantId }: Request): Promise<Response> {
        try {
            const tenant = await this.tenantRepository.findById(tenantId);
            if (!tenant) {
                throw new Error('Tenant not found');
            }

            const lease =
                await this.leaseRepository.findOneByTenantId(tenantId);
            if (!lease) {
                throw new Error('Lease not found');
            }

            const rental = await this.rentalRepository.findById(
                lease.props.rentalId,
            );
            if (!rental) {
                throw new Error('Rental not found');
            }

            const product = await this.productGateway.findProductById(
                rental.props.productId,
            );
            if (!product) {
                throw new Error('Product not found');
            }

            const paymentIntent = await this.paymentGateway.createPaymentIntent(
                product.props.price,
                product.props.currency,
                tenant.props.customerId,
            );

            const paymentId = this.idGenerator.generate();
            const payment = new Payment({
                id: paymentId,
                ownerId: tenantId,
                externalId: paymentIntent.id,
                amount: product.props.price,
                currency: product.props.currency,
                status: PaymentStatus.Pending,
                clientSecret: paymentIntent.clientSecret,
            });

            await this.paymentRepository.create(payment);
        } catch (error) {
            throw error;
        }
    }
}
