import {Entity} from "../../../../shared/entity";

interface LeaseEntityProps {
    id: string;
    rentalId: string;
    tenantId: string;
}

export class Lease extends Entity<LeaseEntityProps> {}
