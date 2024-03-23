from supabase.client import Client, create_client
import os
import logging

# Environment setup
try:
    supabase_url = os.environ["SUPABASE_URL"]
except KeyError:
    logging.error("`SUPABASE_URL` environment variable required")
    raise EnvironmentError("[error]: `SUPABASE_URL` environment variable required")

try:
    supabase_key = os.environ["SUPABASE_KEY"]
except KeyError:
    logging.error("`SUPABASE_KEY` environment variable required")
    raise EnvironmentError("[error]: `SUPABASE_KEY` environment variable required")


def init_db(supabase_url, supabase_key):
    """
    Connect to Supabase project
    """
    logging.info("Initializing Supabase client")
    supabase: Client = create_client(supabase_url, supabase_key)
    return supabase


vector_db = init_db(supabase_url, supabase_key)
