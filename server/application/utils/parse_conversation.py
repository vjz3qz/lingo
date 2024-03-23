def parse_conversation(messages):
    messages_transcription = ""
    for message in messages:
        if message["isUserMessage"]:
            messages_transcription += "User: " + message["text"] + "\n"
        else:
            messages_transcription += "Language Expert: " + message["text"] + "\n"
    return messages_transcription