import { Executable } from '../../../../shared/executable';
import { ITenantRepository } from '../../ports/tenant-repository.port';

type Request = {
    email: string;
};

type Response = {
    id: string;
    name: string;
};

export class LoginUseCase implements Executable<Request, Response> {
    constructor(private readonly tenantRepository: ITenantRepository) {}

    async execute(data: Request): Promise<Response> {
        try {
            const tenant = await this.tenantRepository.findByEmail(data.email);
            if (!tenant) {
                throw new Error('Tenant not found');
            }

            return {
                id: tenant.props.id,
                name: tenant.props.name,
            };
        } catch (error) {
            throw new Error('Failed to login');
        }
    }
}
