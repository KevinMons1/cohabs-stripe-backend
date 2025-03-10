import { Executable } from '../../../../shared/executable';
import { ITenantRepository } from '../../../tenants/ports/tenant-repository.port';
import { ILeaseRepository } from '../../../leases/ports/lease-repository.port';
import { IIDGenerator } from '../../../core/ports/id-generator.port';
import { Tenant } from '../../../tenants/domain/entities/tenant.entity';
import { ITenantGateway } from '../../../tenants/ports/tenant-gateway.port';
import { Lease } from '../../../leases/domain/entities/lease.entity';

type Request = {
    rentalId: string;
    email: string;
    name: string;
};

type Response = void;

export class AddTenantInRentalUsecase implements Executable<Request, Response> {
    constructor(
        private readonly tenantRepository: ITenantRepository,
        private readonly leaseRepository: ILeaseRepository,
        private readonly idGenerator: IIDGenerator,
        private readonly tenantGateway: ITenantGateway,
    ) {}

    async execute(data: Request): Promise<Response> {
        const customerId = await this.tenantGateway.createTenant(
            data.name,
            data.email,
        );

        const tenantId = this.idGenerator.generate();
        const tenant = new Tenant({
            id: tenantId,
            name: data.name,
            email: data.email,
            customerId,
        });

        await this.tenantRepository.create(tenant);

        const leaseId = this.idGenerator.generate();
        const lease = new Lease({
            id: leaseId,
            rentalId: data.rentalId,
            tenantId,
        });

        await this.leaseRepository.create(lease);
    }
}
