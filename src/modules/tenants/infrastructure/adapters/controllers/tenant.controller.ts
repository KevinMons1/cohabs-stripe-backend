import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../../applications/usecases/login.usecase';

@Controller('tenants')
export class TenantController {
    constructor(private readonly loginUseCase: LoginUseCase) {}

    @Post('login')
    async login(@Body() body: { email: string }) {
        return await this.loginUseCase.execute(body);
    }
}
