export const I_TENANT_GATEWAY = 'TENANT_GATEWAY_PORT';

export interface ITenantGateway {
    createTenant(name: string, email: string): Promise<string>;
}
