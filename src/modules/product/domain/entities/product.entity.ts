import {Entity} from "../../../../shared/entity";

interface ProductEntityProps {
    id: string;
    name: string;
    price: number;
    currency: string;
}

export class Product extends Entity<ProductEntityProps> {}
