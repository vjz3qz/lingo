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


def create_user(name, previous_knowledge, interests):
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
    response = db_client.table("users").insert(user_data).execute()
    
    if response["error"]:
        logging.error(f"Failed to create user: {response['error']}")
    else:
        logging.info(f"User {name} created successfully")


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
    response = db_client.table("proficiency").insert(proficiency_data).execute()
    
    if response["error"]:
        logging.error(f"Failed to create proficiency record: {response['error']}")
    else:
        logging.info(f"Proficiency record created successfully")


def get_user_data(user_id):
    """
    Get user data from the database
    """
    logging.info(f"Getting user data for user: {user_id}")
    
    # Query user data from Supabase
    response = db_client.table("users").select("*").eq("name", user_id).execute()
    
    if response["error"]:
        logging.error(f"Failed to get user data: {response['error']}")
        return None, None
    else:
        user_data = response["data"][0]
        return user_data["name"], user_data["previous_knowledge"], user_data["interests"]


def get_user_last_proficiency_by_language(user_id, language):
    """
    Get the last proficiency record for a user in a specific language
    """
    logging.info(f"Getting last proficiency record for user: {user_id} in language: {language}")
    
    # Query proficiency records from Supabase
    response = db_client.table("proficiency").select("*").eq("user_id", user_id).order("timestamp", ascending=False).execute()
    
    if response["error"]:
        logging.error(f"Failed to get proficiency records: {response['error']}")
        return None, None
    else:
        proficiency_records = response["data"]
        for record in proficiency_records:
            if record["language"] == language:
                return record["proficiency_level"], record["feedback"]
        return None, None

def get_user_proficiency_scores_by_language(user_id, language):
    """
    Get all proficiency scores for a user in a specific language
    """
    logging.info(f"Getting proficiency scores for user: {user_id} in language: {language}")
    
    # Query proficiency records from Supabase
    response = db_client.table("proficiency").select("proficiency_level").eq("user_id", user_id).eq("language", language).order("timestamp", ascending=False).execute()
    
    if response["error"]:
        logging.error(f"Failed to get proficiency scores: {response['error']}")
        return []
    else:
        proficiency_scores = [(record["timestamp"], record["proficiency_level"]) for record in response["data"]]
        return proficiency_scores, response["data"][0]["feedback"]