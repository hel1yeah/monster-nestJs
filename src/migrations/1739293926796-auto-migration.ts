import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1739293926796 implements MigrationInterface {
    name = 'AutoMigration1739293926796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "bio" character varying, "image" character varying, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tagsTests" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_dc47a28b9ab300627fbeb0fe60b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "tagsTests"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
