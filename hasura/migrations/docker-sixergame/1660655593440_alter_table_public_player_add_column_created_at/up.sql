alter table "public"."player" add column "created_at" timestamptz
 null default now();
