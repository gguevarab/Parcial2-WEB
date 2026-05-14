CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "roles" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "role_name" character varying NOT NULL,
  "description" character varying,
  CONSTRAINT "UQ_ac35f51a0f17e3e1fe121126039" UNIQUE ("role_name"),
  CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
);

CREATE TABLE "users" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "email" character varying NOT NULL,
  "password" character varying NOT NULL,
  "name" character varying NOT NULL,
  "phone" character varying,
  "is_active" boolean NOT NULL DEFAULT true,
  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
  CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
);

CREATE TABLE "users_roles_roles" (
  "usersId" uuid NOT NULL,
  "rolesId" uuid NOT NULL,
  CONSTRAINT "PK_6c1a055682c229f5a865f2080c1" PRIMARY KEY ("usersId", "rolesId")
);

CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId");
CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId");

ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
