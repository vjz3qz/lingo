import os
import logging
from langchain_openai import ChatOpenAI
from openai import OpenAI
import tempfile

# A mapping from MIME types to file extensions
MIME_TYPE_MAP = {
    "audio/mpeg": ".mp3",
    "audio/ogg": ".ogg",
    "audio/wav": ".wav",
    # Add other MIME types and their extensions as needed
}


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





def transcribe_audio_file(audio_file):
    """
    Transcribes audio using OpenAI's Whisper model.
    :param audio_file: The audio file to be transcribed.
    :return: The transcribed text.
    """
    # Get the content type of the file
    content_type = audio_file.content_type
    # Determine the file extension based on the content type
    file_extension = MIME_TYPE_MAP.get(content_type, None)
    if not file_extension:
        raise ValueError("Unsupported audio file format")

    try:
        with tempfile.NamedTemporaryFile(
            delete=False, suffix=file_extension
        ) as temp_file:
            audio_file.save(temp_file.name)
            with open(temp_file.name, "rb") as file_to_transcribe:
                client = OpenAI(api_key=openai_api_key)
                transcript = client.audio.transcriptions.create(
                    model="whisper-1", file=file_to_transcribe, response_format="text"
                )
        os.remove(temp_file.name)
        return transcript

    except Exception as e:
        logging.error(f"Error during transcription: {e}")
        raise




chat_model = init_chat_model()

