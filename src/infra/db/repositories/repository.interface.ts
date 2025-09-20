import {
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryRunner,
  SelectQueryBuilder,
} from 'typeorm';

import { BaseEntity } from '../entities/base.entity';

export interface IRepository<TEntity extends BaseEntity> {
  createQueryBuilder(alias?: string): SelectQueryBuilder<TEntity>;

  getQueryRunner(): EntityManager;

  findByAsync(id: string, options?: FindOneOptions<TEntity>): Promise<TEntity>;

  findAsync(options?: FindManyOptions<TEntity>): Promise<TEntity[]>;

  findOneAsync(options?: FindOneOptions<TEntity>): Promise<TEntity>;

  findAndCountAsync(
    options?: FindManyOptions<TEntity>,
  ): Promise<[TEntity[], number]>;

  createAsync(entity: TEntity, queryRunner?: QueryRunner): Promise<TEntity>;

  updateAsync(entity: TEntity, queryRunner?: QueryRunner): Promise<TEntity>;

  upsertAsync(entity: TEntity, queryRunner?: QueryRunner): Promise<TEntity>;

  deleteAsync(id: string, queryRunner?: QueryRunner): Promise<boolean>;

  deleteManyAsync(
    filter: FindOptionsWhere<TEntity>,
    queryRunner?: QueryRunner,
  ): Promise<boolean>;

  saveAsync(entity: TEntity, queryRunner?: QueryRunner): Promise<TEntity>;

  softDeleteAsync(entity: TEntity, queryRunner?: QueryRunner): Promise<TEntity>;

  softRemoveAsync(entity: TEntity, queryRunner?: QueryRunner): Promise<TEntity>;

  runInTransactionAsync(
    operationAsync: (queryRunner: QueryRunner) => Promise<any>,
  ): Promise<any>;
}

export interface ITransactionOptions {
  onAbortAsync?: () => Promise<void>;
  onAfterCommitAsync?: () => Promise<void>;
}
