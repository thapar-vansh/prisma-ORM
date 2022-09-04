alter table "public"."users"
  add constraint "users_type_fkey"
  foreign key ("type")
  references "public"."user_types"
  ("value") on update restrict on delete restrict;
