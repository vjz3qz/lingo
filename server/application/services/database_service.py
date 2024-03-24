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


db_client = init_db(supabase_url, supabase_key)



def create_user_in_db(name, previous_knowledge, interests):
    """
    Create a new user in the database
    """
    logging.info(f"Creating user: {name}")
    
    # Upload user data to Supabase
    user_data = {
        "name": name,
        "previous_knowledge": previous_knowledge,
        "interests": interests
    }
    try:
        data, count = db_client.table("users").insert(user_data).execute()
        logging.info(f"User {name} created successfully")
        return 200
    except Exception as e:
        logging.error(f"Failed to create user: {e}")
        return 500


def update_user_in_db(user_id, name, previous_knowledge, interests):
    """
    Update an existing user in the database
    """
    logging.info(f"Updating user: {user_id}")
    # Check if user exists
    data, count = db_client.table("users").select("*").eq("id", user_id).execute()
    if not data:
        logging.error(f"User {user_id} does not exist")
        return 400
    # Upload user data to Supabase
    user_data = {
        "name": name,
        "previous_knowledge": previous_knowledge,
        "interests": interests
    }
    try:
        data, count = db_client.table("users").update(user_data).eq("id", user_id).execute()
        logging.info(f"User {user_id} updated successfully")
        return 200
    except Exception as e:
        logging.error(f"Failed to update user: {e}")
        return 500


def create_proficiency_record(user_id, language, proficiency_level, feedback):
    """
    Create a new proficiency record in the database
    """
    logging.info(f"Creating proficiency record for user: {user_id}")
    
    # Upload proficiency record to Supabase
    proficiency_data = {
        "id": str(uuid.uuid4()),  # Generate a new UUID for the record
        "date": datetime.now(),  # Use current datetime
        "user_id": user_id,
        "language": language,
        "proficiency_level": proficiency_level,
        "feedback": feedback
    }
    try:
        data, count = db_client.table("proficiency").insert(proficiency_data).execute()
        logging.info(f"Proficiency record created successfully")
        return 200
    except Exception as e:
        logging.error(f"Failed to create proficiency record: {e}")
        return 500


def get_user_data(user_id):
    """
    Get user data from the database
    """
    logging.info(f"Getting user data for user: {user_id}")
    try:
        # Query user data from Supabase
        response = db_client.table("users").select("*").eq("name", user_id).execute()
        # TODO: parse response
    except Exception as e:
        logging.error(f"Failed to get user data: {e}")
        return None, None, None


def get_user_last_proficiency_by_language(user_id, language):
    """
    Get the last proficiency record for a user in a specific language
    """
    logging.info(f"Getting last proficiency record for user: {user_id} in language: {language}")
    try:
        # Query proficiency records from Supabase
        response = db_client.table("proficiency").select("*").eq("user_id", user_id).order("timestamp", ascending=False).execute()
        # TODO return
    except Exception as e:
        logging.error(f"Failed to get last proficiency record: {e}")
        return None, None

def get_user_proficiency_scores_by_language(user_id, language):
    """
    Get all proficiency scores for a user in a specific language
    """
    logging.info(f"Getting proficiency scores for user: {user_id} in language: {language}")
    try:
        # Query proficiency records from Supabase
        response = db_client.table("proficiency").select("proficiency_level").eq("user_id", user_id).eq("language", language).order("timestamp", ascending=False).execute()
        # TODO return
    except Exception as e:
        logging.error(f"Failed to get proficiency scores: {e}")
        return None, None