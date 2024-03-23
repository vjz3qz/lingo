from flask import Flask
from flask_cors import CORS
from application.api.v1 import v1 as v1_blueprint
import logging
from application.services.database_service import init_db
from dotenv import load_dotenv
from flask import send_from_directory
import os
from flask import render_template



def create_app():
    app = Flask(
    __name__,
    static_url_path="",
    static_folder="../../client/build",
    template_folder="../../client/build",
    )
    CORS(app)  # if you're using Flask-CORS

    load_dotenv()

    # Configuration, blueprints registration, etc.
    logging.basicConfig(level=logging.DEBUG)
    # logging.basicConfig(level=logging.INFO)
    # Registering the v1 blueprint
    app.register_blueprint(v1_blueprint, url_prefix="/api/v1")


    # Add this at the end of your `create_app` function or after defining all other routes
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists(app.static_folder + '/' + path):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    @app.errorhandler(404)
    def not_found(e):
        return render_template("index.html")


    return app
