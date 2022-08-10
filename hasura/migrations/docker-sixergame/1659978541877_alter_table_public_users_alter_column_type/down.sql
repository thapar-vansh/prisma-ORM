alter table "public"."users" alter column "type" drop not null;
ALTER TABLE "public"."users" ALTER COLUMN "type" drop default;
