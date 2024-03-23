import os
import logging
from langchain_openai import ChatOpenAI


# Environment setup
try:
    openai_api_key = os.environ["OPENAI_API_KEY"]
except KeyError:
    logging.error("`OPENAI_API_KEY` environment variable required")
    raise EnvironmentError("[error]: `OPENAI_API_KEY` environment variable required")

def init_chat_model():
    """
    Initialize chat model
    """
    logging.info("Initializing chat model")
    return ChatOpenAI(temperature=0, model="gpt-4-0125-preview")


chat_model = init_chat_model()

