import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { BaseEntity } from '../entities/base.entity';
import { BaseRespositoryUtil } from '../utils/base-respository.util';

import type { IRepository } from './repository.interface';

@Injectable()
export abstract class BaseRepository<TEntity extends BaseEntity>
  extends Repository<TEntity>
  implements IRepository<TEntity>
{
  protected constructor(
    target: EntityTarget<TEntity>,
    protected dataSource: DataSource,
  ) {
    super(target, dataSource.createEntityManager());
  }

  public getQueryRunner(): EntityManager {
    return this.manager;
  }

  public createQueryBuilder(alias?: string): SelectQueryBuilder<TEntity> {
    return super.createQueryBuilder(alias);
  }

  public async findByAsync(
    id: string,
    options?: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    return this.findOne({
      where: { id },
      ...options,
    } as FindOneOptions<TEntity>);
  }

  public async findAsync(
    options?: FindManyOptions<TEntity>,
  ): Promise<TEntity[]> {
    return this.find(options);
  }

  public async findOneAsync(
    filter?: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    return this.findOne(filter);
  }

  public async findAndCountAsync(
    filter: FindManyOptions<TEntity>,
  ): Promise<[TEntity[], number]> {
    return this.manager.findAndCount(this.target, filter);
  }

  public async createAsync(
    entity: TEntity,
    queryRunner?: QueryRunner,
  ): Promise<TEntity> {
    return this.saveAsync(entity, queryRunner);
  }

  public async updateAsync(
    entity: TEntity,
    queryRunner?: QueryRunner,
  ): Promise<TEntity> {
    const manager = queryRunner ? queryRunner.manager : this.manager;
    const result = await manager
      .createQueryBuilder()
      .update(this.target)
      .set(entity as QueryDeepPartialEntity<TEntity>)
      .where('id = :id', { id: entity.id })
      .returning('*')
      .execute();

    return BaseRespositoryUtil.convertKeysFromSnakeCaseToCamelCase<TEntity>(
      result.raw[0],
    );
  }

  public async upsertAsync(
    entity: TEntity,
    queryRunner?: QueryRunner,
  ): Promise<TEntity> {
    return this.saveAsync(entity, queryRunner);
  }

  public async deleteAsync(
    id: string,
    queryRunner?: QueryRunner,
  ): Promise<boolean> {
    const manager = queryRunner ? queryRunner.manager : this.manager;
    const result = await manager.delete(this.target, id);

    return result.affected > 0;
  }

  public async deleteManyAsync(
    filter: FindOptionsWhere<TEntity>,
    queryRunner?: QueryRunner,
  ): Promise<boolean> {
    const manager = queryRunner ? queryRunner.manager : this.manager;
    const result = await manager.delete(this.target, filter);

    return result.affected > 0;
  }

  public async runInTransactionAsync(
    operationAsync: (queryRunner: QueryRunner) => Promise<any>,
  ): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await operationAsync(queryRunner);

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async saveAsync(
    entity: TEntity,
    queryRunner?: QueryRunner,
  ): Promise<TEntity> {
    const manager = queryRunner ? queryRunner.manager : this.manager;

    return manager.save(entity);
  }

  public async softDeleteAsync(
    entity: TEntity,
    queryRunner?: QueryRunner,
  ): Promise<TEntity> {
    const manager = queryRunner ? queryRunner.manager : this.manager;

    const result = await manager
      .getRepository(this.target)
      .createQueryBuilder()
      .softDelete()
      .where('id = :id AND deleted_at IS NULL', { id: entity.id })
      .returning('*')
      .execute();

    return BaseRespositoryUtil.convertKeysFromSnakeCaseToCamelCase<TEntity>(
      result.raw[0],
    );
  }

  public async softRemoveAsync(
    entity: TEntity,
    queryRunner?: QueryRunner,
  ): Promise<TEntity> {
    const manager = queryRunner ? queryRunner.manager : this.manager;

    return manager.softRemove(entity);
  }
}
