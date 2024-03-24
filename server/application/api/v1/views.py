from . import v1

import logging

from flask import current_app, request, abort, make_response, jsonify
import os
from werkzeug.utils import secure_filename

from application.controllers.chat_controller import (
    get_chat_response,
    analyze_proficiency,
)
from application.services.database_service import update_user_in_db, get_user_data, get_user_proficiency_scores_by_language
from application.services.nlp_service import transcribe_audio
from application.services.auth_service import get_user_id

@v1.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

# update user endpoint
@v1.route("/update-user", methods=["POST"])
def update_user():
    # Extract the token from the Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing"}), 403

    # Get the user ID from the token
    user_id, error = get_user_id(token)
    if user_id is None:
        return jsonify({"message": error}), 403

    # Get request data
    data = request.get_json()

    name = data.get("name", "")
    if not name:
        return jsonify({"message": "Name is required"}), 400
    previous_knowledge = data.get("previous_knowledge", "")
    if not previous_knowledge:
        return jsonify({"message": "Previous knowledge is required"}), 400
    interests = data.get("interests", "")
    if not interests:
        return jsonify({"message": "Interests are required"}), 400

    # Call update user function
    status = update_user_in_db(user_id, name, previous_knowledge, interests)
    if status == 200:
        # Return success response
        return jsonify({"message": "User updated successfully"}), 200
    elif status == 500:
        # Return failure response
        return jsonify({"message": "Failed to update user"}), 500
    elif status == 400:
        # Return user not found response
        return jsonify({"message": "User not found"}), 400
    else:
        # Return generic error response
        abort(500)


@v1.route("/get-user", methods=["GET"])
def get_user():
    # Extract the token from the Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing"}), 403

    # Get the user ID from the token
    user_id, error = get_user_id(token)
    if user_id is None:
        return jsonify({"message": error}), 403

    name, previous_knowledge, interests = get_user_data(user_id)
    return jsonify({"name": name, "previous_knowledge": previous_knowledge, "interests": interests})

# chat endpoint
@v1.route("/chat", methods=["POST"])
def chat():

    # Extract the token from the Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing"}), 403

    # Get the user ID from the token
    user_id, error = get_user_id(token)
    if user_id is None:
        return jsonify({"message": error}), 403

    # Get request data
    data = request.get_json()

    # Extract conversation history and user ID from request body
    conversation_history = data.get("conversation_history", [])
    language = data.get("language", "en")

    # Call chat controller to get chat response
    response = get_chat_response(conversation_history, user_id, language)

    # Return the chat response
    return jsonify({"response": response})


# analyze proficiency endpoint
@v1.route("/analyze-proficiency", methods=["POST"])
def analyze_proficiency():
    # Extract the token from the Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing"}), 403

    # Get the user ID from the token
    user_id, error = get_user_id(token)
    if user_id is None:
        return jsonify({"message": error}), 403

    # Get request data
    data = request.get_json()

    # Extract conversation history and user ID from request body
    conversation_history = data.get("conversation_history", [])
    language = data.get("language", "en")

    # Call analyze proficiency function
    proficiency_level, feedback = analyze_proficiency(conversation_history, user_id, language)

    # Return the proficiency analysis response
    return jsonify({"proficiency_level": proficiency_level, "feedback": feedback})



@v1.route("/get-proficiency-scores/<language>", methods=["GET"])
def get_proficiency_scores(language):
    # Extract the token from the Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing"}), 403

    # Get the user ID from the token
    user_id, error = get_user_id(token)
    if user_id is None:
        return jsonify({"message": error}), 403

    # Use the user ID to get the proficiency scores
    proficiency_scores = get_user_proficiency_scores_by_language(user_id, language)

    return jsonify({"proficiency_scores": proficiency_scores})


# Audio endpoint
@v1.route('/transcribe-audio', methods=['POST'])
def transcribe_audio_endpoint():
    # Extract the token from the Authorization header
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing"}), 403

    # Get the user ID from the token
    user_id, error = get_user_id(token)
    if user_id is None:
        return jsonify({"message": error}), 403

    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files['audio']
    filename = secure_filename(audio_file.filename)
    audio_file_path = os.path.join(current_app.root_path, '..', '..', 'audioFiles', filename)
    try:
        # Make sure the directory exists, if not, create it
        os.makedirs(os.path.dirname(audio_file_path), exist_ok=True)
        # Save the audio file
        audio_file.save(audio_file_path)
        # Transcription service logic here
        transcription_text = transcribe_audio(audio_file_path)
        # Clean up if needed, then send response
        return jsonify({"transcription": transcription_text})
    except Exception as e:
        current_app.logger.error(f"Error processing audio file: {e}")
        return jsonify({"error": "Failed to process audio file"}), 500