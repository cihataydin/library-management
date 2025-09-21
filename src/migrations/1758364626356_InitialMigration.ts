/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration_1758364626356 implements MigrationInterface {
  name = 'InitialMigration_1758364626356';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "name" character varying NOT NULL, "averageRating" double precision NOT NULL DEFAULT '0', "totalRatings" double precision NOT NULL DEFAULT '0', CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_borrowing" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "isReturned" boolean NOT NULL DEFAULT false, "score" integer, "borrowedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "returnedAt" TIMESTAMP WITH TIME ZONE, "userId" integer, "bookId" integer, CONSTRAINT "PK_0d84437cc90b1a00f1e522c5590" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP(3) WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP(3) WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book_borrowing" ADD CONSTRAINT "FK_378e1dd7c52f706f3906053b071" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_borrowing" ADD CONSTRAINT "FK_77f916e3e07d0ce1b41d4e6f1c9" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_borrowing" DROP CONSTRAINT "FK_77f916e3e07d0ce1b41d4e6f1c9"`);
        await queryRunner.query(`ALTER TABLE "book_borrowing" DROP CONSTRAINT "FK_378e1dd7c52f706f3906053b071"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "book_borrowing"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }
}
