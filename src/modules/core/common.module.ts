import {Module} from "@nestjs/common";
import {I_ID_GENERATOR} from "./ports/id-generator.port";
import {IDGenerator} from "./infrastructure/adapters/id-generator";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {I_CONFIG_SERVICE} from "./ports/config-service.port";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TenantOrmEntity} from "../tenants/infrastructure/adapters/orm/tenant-orm.entity";
import {RentalOrmEntity} from "../rentals/infrastructure/adapters/orm/rental-orm.entity";
import {PaymentOrmEntity} from "../payments/infrastructure/adapters/orm/payment-orm.entity";
import {LeaseOrmEntity} from "../leases/infrastructure/adapters/orm/lease-orm.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    type: 'mysql',
                    host: config.get<string>('DB_HOST'),
                    port: config.get<number>('DB_PORT'),
                    username: config.get<string>('DB_USERNAME'),
                    password: config.get<string>('DB_PASSWORD'),
                    database: config.get<string>('DB_NAME'),
                    entities: [TenantOrmEntity, RentalOrmEntity, PaymentOrmEntity, LeaseOrmEntity],
                    synchronize: true,
                };
            }
        })
    ],
    providers: [
        {
            provide: I_ID_GENERATOR,
            useClass: IDGenerator,
        },
        {
            provide: I_CONFIG_SERVICE,
            useExisting: ConfigService,
        }
    ],
    exports: [
        I_ID_GENERATOR,
        I_CONFIG_SERVICE,
    ],
})
export class CommonModule {}
