import os
import logging
import jwt

# Environment setup
try:
    jwt_secret = os.environ["JWT_SECRET"]
    project_id = os.environ["PROJECT_ID"]
except KeyError as e:
    logging.error(f"`{e.args[0]}` environment variable required")
    raise EnvironmentError(f"[error]: `{e.args[0]}` environment variable required")

def decode_token(token):
    try:
        # Assuming the token is prefixed with "Bearer ", remove this part to get the actual token
        actual_token = token.split(" ")[1] if ' ' in token else token

        decoded_token = jwt.decode(actual_token, jwt_secret, algorithms=['HS256'], audience=f"https://{project_id}.supabase.co/auth/v1")
        return decoded_token, None
    except jwt.ExpiredSignatureError:
        return None, 'Token has expired.'
    except jwt.InvalidTokenError:
        return None, 'Invalid token.'

def get_user_id(token):
    decoded_token, error = decode_token(token)
    if error:
        return None, error  # Consider passing error for caller to handle it appropriately
    return decoded_token.get('sub'), None
