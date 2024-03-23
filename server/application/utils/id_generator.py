import secrets


def generate_id():
    return secrets.token_urlsafe(64)
