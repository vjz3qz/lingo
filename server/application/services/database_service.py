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



def update_user_in_db(user_id, name, previous_knowledge, interests):
    """
    Update an existing user in the database
    """
    logging.info(f"Updating user: {user_id}")
    
    # Upload user data to Supabase
    user_data = {
        "id": user_id,
        "name": name,
        "previous_knowledge": previous_knowledge,
        "interests": interests
    }
    
    try:
        data, count = db_client.table("users").upsert(user_data).execute()
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
        data, count = db_client.table("previous_proficiency_feedback").insert(proficiency_data).execute()
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
        data, count = db_client.table("users").select("*").eq("id", user_id).execute()
        data = data[1]
        count = count[1]
        if count == 1:
            user_data = data[0]
            name = user_data["name"]
            previous_knowledge = user_data["previous_knowledge"]
            interests = user_data["interests"]
            return name, previous_knowledge, interests
        else:
            return None, None, None
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
        data, count = db_client.table("previous_proficiency_feedback").select("*").eq("user_id", user_id).execute()
        data = data[1]
        count = count[1]
        # TODO return latest record
        if count is not None and count > 0:
            proficiency_record = data[0]
            proficiency_level = proficiency_record["proficiency_level"]
            feedback = proficiency_record["feedback"]
            return proficiency_level, feedback
        else:
            return None, None
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
        data, count = db_client.table("previous_proficiency_feedback").select("proficiency_level", "feedback").eq("user_id", user_id).eq("language", language).execute()
        data = data[1]
        count = count[1]
        print(data) # TODO check when there is data
        proficiency_scores = []
        for record in data:
            proficiency_scores.append({
                "y": record["proficiency_level"],
                "feedback": record["feedback"]
            })
        
        return proficiency_scores
    except Exception as e:
        logging.error(f"Failed to get proficiency scores: {e}")
        return None
