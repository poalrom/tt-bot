import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserAnswersTable1565447037175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1f400292cf7ea23b570abe72284"`);
        await queryRunner.query(`CREATE TABLE "user_answers" ("userChatId" integer NOT NULL, "answerId" integer NOT NULL, CONSTRAINT "PK_a08fc2435716c08271689bf5da8" PRIMARY KEY ("userChatId", "answerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d75e8476f55b153d0e46020c15" ON "user_answers" ("userChatId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c4731694c2bc85d2b5acc0cee3" ON "user_answers" ("answerId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_1f400292cf7ea23b570abe7228"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "currentQuestionId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "answeredQuestionsIds"`);
        await queryRunner.query(`ALTER TABLE "user_answers" ADD CONSTRAINT "FK_d75e8476f55b153d0e46020c15a" FOREIGN KEY ("userChatId") REFERENCES "user"("chatId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answers" ADD CONSTRAINT "FK_c4731694c2bc85d2b5acc0cee37" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_answers" DROP CONSTRAINT "FK_c4731694c2bc85d2b5acc0cee37"`);
        await queryRunner.query(`ALTER TABLE "user_answers" DROP CONSTRAINT "FK_d75e8476f55b153d0e46020c15a"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "answeredQuestionsIds" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "currentQuestionId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_1f400292cf7ea23b570abe7228" UNIQUE ("currentQuestionId")`);
        await queryRunner.query(`DROP INDEX "IDX_c4731694c2bc85d2b5acc0cee3"`);
        await queryRunner.query(`DROP INDEX "IDX_d75e8476f55b153d0e46020c15"`);
        await queryRunner.query(`DROP TABLE "user_answers"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1f400292cf7ea23b570abe72284" FOREIGN KEY ("currentQuestionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
