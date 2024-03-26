alter table "public"."previous_proficiency_feedback" alter column "id" set default gen_random_uuid();

alter table "public"."previous_proficiency_feedback" alter column "timestamp" set default CURRENT_TIMESTAMP;

alter table "public"."previous_proficiency_feedback" alter column "timestamp" drop not null;

alter table "public"."previous_proficiency_feedback" alter column "timestamp" set data type timestamp with time zone using "timestamp"::timestamp with time zone;


