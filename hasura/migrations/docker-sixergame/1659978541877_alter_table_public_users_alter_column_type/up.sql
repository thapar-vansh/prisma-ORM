alter table "public"."users" alter column "type" set default 'FREE';
alter table "public"."users" alter column "type" set not null;
