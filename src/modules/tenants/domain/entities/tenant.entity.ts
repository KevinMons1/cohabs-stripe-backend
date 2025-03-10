import {Entity} from "../../../../shared/entity";

interface TenantEntityProps {
    id: string;
    name: string;
    email: string;
    customerId: string;
}

export class Tenant extends Entity<TenantEntityProps> {}
