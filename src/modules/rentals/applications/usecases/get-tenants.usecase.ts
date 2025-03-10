import { Executable } from '../../../../shared/executable';
import { ILeaseRepository } from '../../../leases/ports/lease-repository.port';
import { ITenantRepository } from '../../../tenants/ports/tenant-repository.port';

type Request = {
    rentalId: string;
};

type Response = Array<{
    id: string;
    name: string;
    email: string;
}>;

export class GetTenantsUseCase implements Executable<Request, Response> {
    constructor(
        private readonly leaseRepository: ILeaseRepository,
        private readonly tenantRepository: ITenantRepository,
    ) {}

    async execute(data: Request): Promise<Response> {
        try {
            const leases = await this.leaseRepository.findByRentalId(
                data.rentalId,
            );
            if (leases.length === 0) return [];

            const tenants = await this.tenantRepository.findByIds(
                leases.map((lease) => lease.props.tenantId),
            );
            if (tenants.length === 0) return [];

            return tenants.map((tenant) => ({
                id: tenant.props.id,
                name: tenant.props.name,
                email: tenant.props.email,
            }));
        } catch (error) {
            throw new Error('Failed to get tenants');
        }
    }
}
