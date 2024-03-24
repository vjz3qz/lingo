# transcription_service.py

from openai import OpenAI
from .env import OPENAI_API_KEY

# Initialize the OpenAI client with your API key
client = OpenAI(api_key=OPENAI_API_KEY)

def transcribe_audio(audio_file_path):
    """
    Transcribes audio using OpenAI's Whisper model.
    :param audio_file_path: Path to the audio file to be transcribed.
    :return: The transcribed text.
    """
    with open(audio_file_path, 'rb') as audio_file:
        # Make sure to check OpenAI's official documentation
        # for the correct method to transcribe audio
        transcription = client.audio.transcriptions.create(audio_file)
        return transcription['text']
