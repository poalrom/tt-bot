import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdminTable1564919390948 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "admin" ("chatId" integer NOT NULL, "login" character varying NOT NULL, "currentCommand" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_148f9a86808f7c4a7c4957b3f32" PRIMARY KEY ("chatId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
