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
    return ChatOpenAI(temperature=0.2, model="gpt-4-0125-preview")




import openai

def transcribe_audio(audio_file_path):
    """
    Transcribes audio using OpenAI's Whisper model.
    :param audio_file_path: Path to the audio file to be transcribed.
    :return: The transcribed text.
    """
    audio_file = open(audio_file_path, "rb")
    transcription = openai.Audio.transcribe("whisper-1", audio_file)
    return transcription['text']




chat_model = init_chat_model()

