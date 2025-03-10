export const I_CONFIG_SERVICE = 'I_CONFIG_SERVICE';

export interface IConfigService {
    get<T>(key: string): T;
}
