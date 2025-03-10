export const I_UNIT_OF_WORK = 'UNIT_OF_WORK_PORT';

export interface IUnitOfWork {
    start(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
