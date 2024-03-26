
from langchain.memory import ChatMessageHistory


def parse_conversation(messages):
    conversation_history = ChatMessageHistory()
    for message in messages:
        if message["isUserMessage"]:
            conversation_history.add_user_message(message["text"])
        else:
            conversation_history.add_ai_message(message["text"])
    return conversation_history.messages

def parse_conversation_as_string(messages):
    messages_transcription = []
    for message in messages:
        if message["isUserMessage"]:
            messages_transcription.append("User: " + message["text"] + "\n")
        else:
            messages_transcription.append("Language Expert: " + message["text"] + "\n")
    return "".join(messages_transcription)