import { Lease } from '../domain/entities/lease.entity';

export const I_LEASE_REPOSITORY = 'I_LEASE_REPOSITORY';

export interface ILeaseRepository {
    findById(id: string): Promise<Lease | null>;
    findOneByTenantId(tenantId: string): Promise<Lease | null>;
    findByRentalId(rentalId: string): Promise<Lease[]>;
    create(lease: Lease): Promise<void>;
}
