from . import v1

import logging
# from application.controllers.chat_controller import (
#     get_chat_response,
# )

# from application.services.database_service import (
#     get_chat_history,
#     save_chat_history,
# )


from flask import jsonify, request
import os

# health endpoint
@v1.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})
