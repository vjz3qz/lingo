from . import v1

import logging
from application.controllers.chat_controller import (
    get_chat_response,
    analyze_proficiency,
)

from application.services.database_service import create_user_in_db, update_user_in_db, get_user_data, signup_user, login_user, logout_user

from flask import Blueprint, request, abort, make_response, jsonify
import os
from flask import abort
from werkzeug.utils import secure_filename
from services.transcription_service import transcribe_audio

v1 = Blueprint('v1', __name__)

# sign up endpoint
@v1.route("/sign-up", methods=["POST"])
def sign_up():
    # Get request data
    data = request.get_json()

    # Extract user ID and user data from request body
    email = data.get("email", "")
    if not email:
        return jsonify({"message": "Email is required"}), 400
    password = data.get("password", "")
    if not password:
        return jsonify({"message": "Password is required"}), 400

    # Call signup user function
    status, session = signup_user(email, password)
    if status == 200:
        # Return success response

        response = make_response(jsonify({'message': 'Logged in successfully'}))
        response.set_cookie('access_token', session['access_token'], httponly=True, secure=True)
        return response
        return jsonify({"message": "User signed up successfully"}), 200
    elif status == 500:
        # Return failure response
        return jsonify({"message": "Failed to sign up user"}), 500
    else:
        # Return generic error response
        abort(500)

# log in endpoint
@v1.route("/log-in", methods=["POST"])
def log_in():
    # Get request data
    data = request.get_json()

    # Extract user ID and user data from request body
    email = data.get("email", "")
    if not email:
        return jsonify({"message": "Email is required"}), 400
    password = data.get("password", "")
    if not password:
        return jsonify({"message": "Password is required"}), 400

    # Call login user function
    status = login_user(email, password)
    if status == 200:
        # Return success response
        return jsonify({"message": "User logged in successfully"}), 200
    elif status == 500:
        # Return failure response
        return jsonify({"message": "Failed to log in user"}), 500
    else:
        # Return generic error response
        abort(500)

# log out endpoint
@v1.route("/log-out", methods=["POST"])
def log_out():
    # Call logout user function
    status = logout_user()
    if status == 200:
        # Return success response
        return jsonify({"message": "User logged out successfully"}), 200
    elif status == 500:
        # Return failure response
        return jsonify({"message": "Failed to log out user"}), 500
    else:
        # Return generic error response
        abort(500)

# create user endpoint
@v1.route("/create-user", methods=["POST"])
def create_user():
    # Get access token from cookie
    access_token = request.cookies.get('access_token')
    # Get request data
    data = request.get_json()

    # Extract user ID and user data from request body
    name = data.get("name", "")
    if not name:
        return jsonify({"message": "Name is required"}), 400
    previous_knowledge = data.get("previous_knowledge", "")
    if not previous_knowledge:
        return jsonify({"message": "Previous knowledge is required"}), 400
    interests = data.get("interests", "")
    if not interests:
        return jsonify({"message": "Interests are required"}), 400

    # Call create user function
    status = create_user_in_db(name, previous_knowledge, interests)
    if status == 200:
        # Return success response
        return jsonify({"message": "User created successfully"}), 200
    elif status == 500:
        # Return failure response
        return jsonify({"message": "Failed to create user"}), 500
    else:
        # Return generic error response
        abort(500)

#TODO merge create/update user
# update user endpoint
@v1.route("/update-user", methods=["POST"])
def update_user():
    # Get request data
    data = request.get_json()

    # Extract user ID and user data from request body
    user_id = data.get("user_id", "")
    if not user_id:
        return jsonify({"message": "User ID is required"}), 400
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


@v1.route("/get-user/<user_id>", methods=["GET"])
def get_user(user_id):
    name, previous_knowledge, interests = get_user_data(user_id)
    return jsonify({"name": name, "previous_knowledge": previous_knowledge, "interests": interests})

# chat endpoint
@v1.route("/chat", methods=["POST"])
def chat():
    # Get request data
    data = request.get_json()

    # Extract conversation history and user ID from request body
    conversation_history = data.get("conversation_history", [])
    language = data.get("language", "en")
    user_id = data.get("user_id", "")

    # Call chat controller to get chat response
    response = get_chat_response(conversation_history, user_id, language)

    # Return the chat response
    return jsonify({"response": response})


# analyze proficiency endpoint
@v1.route("/analyze-proficiency", methods=["POST"])
def analyze_proficiency():
    # Get request data
    data = request.get_json()

    # Extract conversation history and user ID from request body
    conversation_history = data.get("conversation_history", [])
    language = data.get("language", "en")
    user_id = data.get("user_id", "")

    # Call analyze proficiency function
    proficiency_level, feedback = analyze_proficiency(conversation_history, user_id, language)

    # Return the proficiency analysis response
    return jsonify({"proficiency_level": proficiency_level, "feedback": feedback})

@v1.route("/get-proficiency-scores/<user_id>/<language>", methods=["GET"])
def get_proficiency_scores(user_id, language):
    proficiency_scores, last_feedback = get_user_proficiency_scores_by_language(user_id, language)
    return jsonify({"proficiency_scores": proficiency_scores, "last_feedback": last_feedback})