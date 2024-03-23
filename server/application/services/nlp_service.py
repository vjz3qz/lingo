import os
import logging
from langchain_openai import OpenAIEmbeddings
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAI


# Environment setup
try:
    openai_api_key = os.environ["OPENAI_API_KEY"]
except KeyError:
    logging.error("`OPENAI_API_KEY` environment variable required")
    raise EnvironmentError("[error]: `OPENAI_API_KEY` environment variable required")


def init_embeddings():
    """
    Initialize embeddings
    """
    logging.info("Initializing embeddings")
    return OpenAIEmbeddings()


def init_chat_model():
    """
    Initialize chat model
    """
    logging.info("Initializing chat model")
    return ChatOpenAI(temperature=0, model="gpt-4-0125-preview")

def init_llm():
    """
    Initialize large language model
    """
    logging.info("Initializing large language model")
    return OpenAI(temperature=0, model="gpt-3.5-turbo-instruct")


embeddings = init_embeddings()
chat_model = init_chat_model()
llm = init_llm()

