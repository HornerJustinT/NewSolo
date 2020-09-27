CREATE TABLE "users" (
	"id" serial,
	"user_name" varchar(255),
	CONSTRAINT "USERS_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "run_history" (
	"id" serial,
	"runner_id" integer,
	"length" real NOT NULL,
	"time" real NOT NULL,
	"pace" VARCHAR(20) NOT NULL,
	"date" VARCHAR(20) NOT NULL,
	CONSTRAINT "run_history_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "run_history" ADD CONSTRAINT "run_history_fk0" FOREIGN KEY ("runner_id") REFERENCES "users"("id");
SELECT * FROM users WHERE user_name= 'horner.justin.t';

INSERT INTO run_history ("runner_id", "length", "time", "pace", "date")
values (2, 9, 130, CONCAT(FLOOR(130/9), ':', (FLOOR(60.0*(MOD(130,9)/CAST(9 AS REAL))))), 'test');

UPDATE run_history
 SET "length" = (12), "time" = (120), "pace" = (CONCAT(FLOOR(120/12), ':', (FLOOR(60.0*(MOD(120,12)/CAST(12 AS REAL)))))) ,"date" = ('test2')
 WHERE "id" = 5;