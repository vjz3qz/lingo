from langchain.chat_models import ChatOpenAI
from langchain.prompts.chat import ChatPromptTemplate, HumanMessagePromptTemplate
from application.services.database_service import db_client, get_user_data, get_user_proficiency, get_user_last_proficiency_by_language, create_proficiency_record
from application.services.nlp_service import chat_model
import logging



def get_chat_response(conversation_history, user_id, language):
    name, interests = get_user_data(user_id)
    previous_proficiency_score, previous_proficiency_feedback = get_user_proficiency(user_id, language)
    template = """You are a language expert in {language} who is doing having a conversation with, {name}. 
                    This is their interests: {interests}
                    This is their previous proficiency feedback in {language}: {previous_proficiency_feedback}
                    Here is your conversation history: 

                    {conversation_history}

                    If there is no conversation history, start a conversation with {name} about their interests.
                    If there is conversation history, continue the conversation with {name}.
                    Your response:
                    """
    
    chat_prompt = ChatPromptTemplate.from_template(template)
    response = chat(chat_prompt.format_messages(
    language=language,
    name=name,
    interests=interests,
    previous_proficiency_feedback=previous_proficiency_feedback,
    conversation_history=conversation_history
    ))
    return response


def analyze_proficiency(conversation_history, user_id, language):
    name, interests = get_user_data(user_id)
    previous_proficiency_score, previous_proficiency_feedback = get_user_last_proficiency_by_language(user_id, language)
    template = """You are a language expert in {language} who finished having a conversation with, {name}.
                    This is their previous proficiency level in {language}: {previous_proficiency_score}
                    This is their previous proficiency feedback in {language}: {previous_proficiency_feedback}
                    Here is your conversation history: 

                    {conversation_history}

                    Analyze {name}'s proficiency in {language} based on the conversation history, providing 
                    insightful and constructive feedback and an updated proficiency score. The updated proficiency 
                    score should be an integer. If there was no previous proficiency score, provide a proficiency 
                    score based on the conversation history, starting from 0.

                    Your response should be in the following format:
                    Proficiency Score: [score]
                    Feedback: [feedback]
                    """
    
    chat_prompt = ChatPromptTemplate.from_template(template)
    response = chat(chat_prompt.format_messages(
    language=language,
    name=name,
    interests=interests,
    previous_proficiency_feedback=previous_proficiency_feedback,
    previous_proficiency_score=previous_proficiency_score,
    conversation_history=conversation_history
    ))


    # Parse the response to get the proficiency score and feedback
    lines = response.split('\n')
    proficiency_score = int(lines[0].split(': ')[1])
    feedback = lines[1].split(': ')[1]

    create_proficiency_record(user_id, language, proficiency_score, feedback)
    return proficiency_score, feedback



