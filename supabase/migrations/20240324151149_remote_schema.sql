revoke delete on table "public"."previous_proficiency_feedback"
from
    "anon";

revoke insert on table "public"."previous_proficiency_feedback"
from
    "anon";

revoke references on table "public"."previous_proficiency_feedback"
from
    "anon";

revoke
select
    on table "public"."previous_proficiency_feedback"
from
    "anon";

revoke trigger on table "public"."previous_proficiency_feedback"
from
    "anon";

revoke truncate on table "public"."previous_proficiency_feedback"
from
    "anon";

revoke
update on table "public"."previous_proficiency_feedback"
from
    "anon";

revoke delete on table "public"."previous_proficiency_feedback"
from
    "authenticated";

revoke insert on table "public"."previous_proficiency_feedback"
from
    "authenticated";

revoke references on table "public"."previous_proficiency_feedback"
from
    "authenticated";

revoke
select
    on table "public"."previous_proficiency_feedback"
from
    "authenticated";

revoke trigger on table "public"."previous_proficiency_feedback"
from
    "authenticated";

revoke truncate on table "public"."previous_proficiency_feedback"
from
    "authenticated";

revoke
update on table "public"."previous_proficiency_feedback"
from
    "authenticated";

revoke delete on table "public"."previous_proficiency_feedback"
from
    "service_role";

revoke insert on table "public"."previous_proficiency_feedback"
from
    "service_role";

revoke references on table "public"."previous_proficiency_feedback"
from
    "service_role";

revoke
select
    on table "public"."previous_proficiency_feedback"
from
    "service_role";

revoke trigger on table "public"."previous_proficiency_feedback"
from
    "service_role";

revoke truncate on table "public"."previous_proficiency_feedback"
from
    "service_role";

revoke
update on table "public"."previous_proficiency_feedback"
from
    "service_role";

revoke delete on table "public"."users"
from
    "anon";

revoke insert on table "public"."users"
from
    "anon";

revoke references on table "public"."users"
from
    "anon";

revoke
select
    on table "public"."users"
from
    "anon";

revoke trigger on table "public"."users"
from
    "anon";

revoke truncate on table "public"."users"
from
    "anon";

revoke
update on table "public"."users"
from
    "anon";

revoke delete on table "public"."users"
from
    "authenticated";

revoke insert on table "public"."users"
from
    "authenticated";

revoke references on table "public"."users"
from
    "authenticated";

revoke
select
    on table "public"."users"
from
    "authenticated";

revoke trigger on table "public"."users"
from
    "authenticated";

revoke truncate on table "public"."users"
from
    "authenticated";

revoke
update on table "public"."users"
from
    "authenticated";

revoke delete on table "public"."users"
from
    "service_role";

revoke insert on table "public"."users"
from
    "service_role";

revoke references on table "public"."users"
from
    "service_role";

revoke
select
    on table "public"."users"
from
    "service_role";

revoke trigger on table "public"."users"
from
    "service_role";

revoke truncate on table "public"."users"
from
    "service_role";

revoke
update on table "public"."users"
from
    "service_role";

alter table "public"."previous_proficiency_feedback"
drop constraint "previous_proficiency_feedback_user_id_fkey";

alter table "public"."users"
drop constraint "users_id_fkey";

alter table "public"."previous_proficiency_feedback"
drop constraint "previous_proficiency_feedback_pkey";

alter table "public"."users"
drop constraint "users_pkey";

drop index if exists "public"."previous_proficiency_feedback_pkey";

drop index if exists "public"."users_pkey";

drop table "public"."previous_proficiency_feedback";

drop table "public"."users";