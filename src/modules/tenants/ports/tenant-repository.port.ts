import { Tenant } from '../domain/entities/tenant.entity';

export const I_TENANT_REPOSITORY = 'I_TENANT_REPOSITORY';

export interface ITenantRepository {
    findById(id: string): Promise<Tenant | null>;
    findByIds(ids: string[]): Promise<Tenant[]>;
    findByEmail(email: string): Promise<Tenant | null>;
    create(tenant: Tenant): Promise<void>;
}
