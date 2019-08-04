import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1564910678252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "announcement" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "posted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e0ef0550174fd1099a308fd18a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "isRight" boolean NOT NULL DEFAULT false, "questionId" integer NOT NULL, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("chatId" integer NOT NULL, "login" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "state" integer NOT NULL DEFAULT 0, "score" integer NOT NULL DEFAULT 0, "currentQuestionId" integer, "answeredQuestionsIds" character varying NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "REL_1f400292cf7ea23b570abe7228" UNIQUE ("currentQuestionId"), CONSTRAINT "PK_1cfa1784ac9e67d4be782f4e5b8" PRIMARY KEY ("chatId"))`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1f400292cf7ea23b570abe72284" FOREIGN KEY ("currentQuestionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1f400292cf7ea23b570abe72284"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "announcement"`);
    }

}
