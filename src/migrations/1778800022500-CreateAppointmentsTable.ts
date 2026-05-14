import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppointmentsTable1778800022500 implements MigrationInterface {
    name = 'CreateAppointmentsTable1778800022500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum" AS ENUM('pending', 'cancelled', 'done')`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_id" uuid NOT NULL, "doctor_id" uuid NOT NULL, "reason" character varying NOT NULL, "datetime" TIMESTAMP NOT NULL, "status" "public"."appointments_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_ccc5bbce58ad6bc96faa428b1e4" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_4cf26c3f972d014df5c68d503d2" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_4cf26c3f972d014df5c68d503d2"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_ccc5bbce58ad6bc96faa428b1e4"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
    }

}
