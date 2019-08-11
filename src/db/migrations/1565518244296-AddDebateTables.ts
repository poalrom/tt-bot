import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDebateTables1565518244296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "debate" ("id" SERIAL NOT NULL, "theme" character varying NOT NULL DEFAULT '', "defender" character varying NOT NULL DEFAULT '', "opponent" character varying NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b4dfdc0b06c019e20e85570158f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "debate_vote" ("id" SERIAL NOT NULL, "forOpponent" boolean NOT NULL, "userChatId" integer, "debateId" integer, CONSTRAINT "PK_7b8ee55b1e52fafedc41df0985e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "debate_vote" ADD CONSTRAINT "FK_30f43b1bc6b4fed018f2299eca1" FOREIGN KEY ("userChatId") REFERENCES "user"("chatId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "debate_vote" ADD CONSTRAINT "FK_7234ce0930e78ebdfc2e8038779" FOREIGN KEY ("debateId") REFERENCES "debate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "debate_vote" DROP CONSTRAINT "FK_7234ce0930e78ebdfc2e8038779"`);
        await queryRunner.query(`ALTER TABLE "debate_vote" DROP CONSTRAINT "FK_30f43b1bc6b4fed018f2299eca1"`);
        await queryRunner.query(`DROP TABLE "debate_vote"`);
        await queryRunner.query(`DROP TABLE "debate"`);
    }

}
