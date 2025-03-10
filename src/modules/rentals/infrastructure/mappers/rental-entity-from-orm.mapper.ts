import {Rental} from "../../domain/entities/rental.entity";
import {RentalOrmEntity} from "../adapters/orm/rental-orm.entity";

export class RentalEntityFromOrmMapper {
    static toDomainEntity(ormEntity: RentalOrmEntity): Rental {
        return new Rental({
            id: ormEntity.id,
            name: ormEntity.name,
            price: ormEntity.price,
            currency: ormEntity.currency,
            city: ormEntity.city,
            productId: ormEntity.productId,
        });
    }
}
