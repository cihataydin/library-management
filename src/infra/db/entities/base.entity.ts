import { AutoMap } from '@automapper/classes';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', precision: 3 })
  public createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
    type: 'timestamptz',
    precision: 3,
  })
  public updatedAt: Date;

  @AutoMap()
  @DeleteDateColumn({
    nullable: true,
    name: 'deleted_at',
    type: 'timestamptz',
    precision: 3,
  })
  public deletedAt: Date;

  @BeforeInsert()
  public beforeInsertEntity() {
    if (!this.id) {
      this.id = uuidv4();
    }

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  public beforeUpdateEntity() {
    this.updatedAt = new Date();
  }
}
