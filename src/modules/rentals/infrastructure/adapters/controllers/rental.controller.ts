import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetRentalPaymentsUseCase } from '../../../applications/usecases/get-rental-payments.usecase';
import { GetTenantsUseCase } from '../../../applications/usecases/get-tenants.usecase';
import { AddTenantInRentalUsecase } from '../../../applications/usecases/add-tenant-in-rental.usecase';

@Controller('rentals')
export class RentalController {
    constructor(
        private readonly getRentalPaymentsUseCase: GetRentalPaymentsUseCase,
        private readonly GetTenantsUseCase: GetTenantsUseCase,
        private readonly AddTenantInRentalUseCase: AddTenantInRentalUsecase,
    ) {}

    @Get('payments/:id')
    async getPayments(@Param() param: { id: string }) {
        const { id } = param;
        return await this.getRentalPaymentsUseCase.execute({
            id,
        });
    }

    @Get(':id/tenants')
    async getTenants(@Param() param: { id: string }) {
        const { id } = param;
        return await this.GetTenantsUseCase.execute({
            rentalId: id,
        });
    }

    @Post(':id/add-tenant')
    async addTenant(
        @Param() param: { id: string },
        @Body() body: { email: string; name: string },
    ) {
        const { id } = param;
        return await this.AddTenantInRentalUseCase.execute({
            rentalId: id,
            email: body.email,
            name: body.name,
        });
    }
}
