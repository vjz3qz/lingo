import os
import logging
import jwt

# Environment setup
try:
    jwt_secret = os.environ["JWT_SECRET"]
except KeyError:
    logging.error("`JWT_SECRET` environment variable required")
    raise EnvironmentError("[error]: `JWT_SECRET` environment variable required")

try:
    project_id = os.environ["PROJECT_ID"]
except KeyError:
    logging.error("`PROJECT_ID` environment variable required")
    raise EnvironmentError("[error]: `PROJECT_ID` environment variable required")

def decode_token(token):
    try:
        decoded_token = jwt.decode(token, jwt_secret, algorithms=['HS256'], audience=f"https://{project_id}.supabase.co/auth/v1")
        return decoded_token
    except jwt.ExpiredSignatureError:
        return None

def get_user_id(token):
    try:
        decoded_token = decode_token(token)
        if decoded_token is None:
            return None
        return decoded_token['sub']
    except jwt.ExpiredSignatureError:
        return None