from . import v1

import logging
from application.controllers.chat_controller import (
    get_chat_response,
    analyze_proficiency,
)

from application.services.database_service import create_user, update_user, get_user_data

from flask import jsonify, request
import os


# create user endpoint
@v1.route("/create-user", methods=["POST"])
def create_user():
    # Get request data
    data = request.get_json()

    # Extract user ID and user data from request body
    name = data.get("user_id", "")
    previous_knowledge = data.get("previous_knowledge", "")
    interests = data.get("interests", "")

    # Call create user function
    create_user(name, previous_knowledge, interests)

    # Return success response
    return jsonify({"message": "User created successfully"})


# update user endpoint
@v1.route("/update-user", methods=["POST"])
def update_user():
    # Get request data
    data = request.get_json()

    # Extract user ID and user data from request body
    user_id = data.get("user_id", "")
    name = data.get("name", "")
    previous_knowledge = data.get("previous_knowledge", "")
    interests = data.get("interests", "")

    # Call update user function
    update_user(user_id, name, previous_knowledge, interests)

    # Return success response
    return jsonify({"message": "User updated successfully"})


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