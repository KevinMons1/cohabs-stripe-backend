export const I_LOGGER = 'LOGGER_PORT';

export interface ILogger {
    info(message: string, metadata?: any): void;
    error(message: string, metadata?: any): void;
}
