import { Module } from '@nestjs/common';
import {PaymentModule} from "../payments/payment.module";
import {CommonModule} from "./common.module";
import {TenantModule} from "../tenants/tenant.module";
import {RentalModule} from "../rentals/rental.module";
import {LeaseModule} from "../leases/lease.module";
import {ProductModule} from "../product/product.module";
import {WebhookModule} from "../webhook/webhook.module";

@Module({
    imports: [
        CommonModule,
        PaymentModule,
        TenantModule,
        RentalModule,
        LeaseModule,
        ProductModule,
        WebhookModule
    ],
})
export class AppModule {}
