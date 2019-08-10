import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAnswerTimestampToUser1564912232562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "last_answer_timestamp" bigint NOT NULL DEFAULT EXTRACT(epoch from NOW())*1000`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_answer_timestamp"`);
    }

}
