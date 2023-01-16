import { MigrationInterface, QueryRunner } from "typeorm";

export class new1673893564738 implements MigrationInterface {
    name = 'new1673893564738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes" ADD "authorId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE TYPE "public"."bugs_priority_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "priority" "public"."bugs_priority_enum" NOT NULL DEFAULT 'low'`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "isResolved" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "closedById" uuid`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "closedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "reopenedById" uuid`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "reopenedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "createdById" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "updatedById" uuid`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD "updatedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "createdById" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_d358080cb403fe88e62cc9cba58" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD CONSTRAINT "FK_5748f0f4995f9530bf174a068af" FOREIGN KEY ("closedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD CONSTRAINT "FK_2e4e579ff84e2e8ee880be824d4" FOREIGN KEY ("reopenedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD CONSTRAINT "FK_953bc502117c756d7268995b358" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bugs" ADD CONSTRAINT "FK_df9f856721165a7d9e57705fb26" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP CONSTRAINT "FK_df9f856721165a7d9e57705fb26"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP CONSTRAINT "FK_953bc502117c756d7268995b358"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP CONSTRAINT "FK_2e4e579ff84e2e8ee880be824d4"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP CONSTRAINT "FK_5748f0f4995f9530bf174a068af"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_d358080cb403fe88e62cc9cba58"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "updatedById"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "reopenedAt"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "reopenedById"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "closedAt"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "closedById"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "isResolved"`);
        await queryRunner.query(`ALTER TABLE "bugs" DROP COLUMN "priority"`);
        await queryRunner.query(`DROP TYPE "public"."bugs_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "authorId"`);
    }

}
