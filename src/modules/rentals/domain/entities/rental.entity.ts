import {Entity} from "../../../../shared/entity";

interface RentalEntityProps {
    id: string;
    name: string;
    price: number;
    currency: string;
    city: string;
    productId: string;
}

export class Rental extends Entity<RentalEntityProps> {}
