import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILeaseRepository } from '../../../ports/lease-repository.port';
import { LeaseOrmEntity } from '../orm/lease-orm.entity';
import { Lease } from '../../../domain/entities/lease.entity';
import { LeaseEntityFromOrmMapper } from '../../mappers/lease-entity-from-orm.mapper';

export class MysqlLeaseRepository implements ILeaseRepository {
    constructor(
        @InjectRepository(LeaseOrmEntity)
        readonly leaseRepository: Repository<LeaseOrmEntity>,
    ) {}

    async findById(id: string): Promise<Lease | null> {
        try {
            const leaseOrm = await this.leaseRepository.findOneBy({
                id,
            });
            return leaseOrm
                ? LeaseEntityFromOrmMapper.toDomainEntity(leaseOrm)
                : null;
        } catch (error) {
            throw new Error('Failed to find by id');
        }
    }

    async findOneByTenantId(tenantId: string): Promise<Lease | null> {
        try {
            const leaseOrm = await this.leaseRepository.findOne({
                where: {
                    tenant: {
                        id: tenantId,
                    },
                },
                relations: ['tenant', 'rental'],
            });
            return leaseOrm
                ? LeaseEntityFromOrmMapper.toDomainEntity(leaseOrm)
                : null;
        } catch (error) {
            throw new Error('Failed to find tenant by id');
        }
    }

    async findByRentalId(rentalId: string): Promise<Lease[]> {
        try {
            const leaseOrm = await this.leaseRepository.find({
                where: {
                    rental: {
                        id: rentalId,
                    },
                },
                relations: ['tenant', 'rental'],
            });
            return leaseOrm
                ? leaseOrm.map((leaseOrm) =>
                      LeaseEntityFromOrmMapper.toDomainEntity(leaseOrm),
                  )
                : [];
        } catch (error) {
            throw new Error('Failed to find tenant by id');
        }
    }

    async create(lease: Lease): Promise<void> {
        try {
            const leaseOrm = LeaseEntityFromOrmMapper.toOrmEntity(lease);
            await this.leaseRepository.save(leaseOrm);
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create lease');
        }
    }
}
