from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.runnables import RunnableParallel
from langchain.prompts import PromptTemplate
# from application.services.database_service import db_client, get_user_data
from application.services.nlp_service import embeddings, chat_model
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
                    Your response:"""
    
    pass

def analyze_proficiency(conversation_history, user_id, language):
    name, interests = get_user_data(user_id)
    previous_proficiency_score, previous_proficiency_feedback = get_user_proficiency(user_id, language)
    template = """You are a language expert in {language} who finished having a conversation with, {name}.
                    This is their previous proficiency level in {language}: {previous_proficiency_score}
                    This is their previous proficiency feedback in {language}: {previous_proficiency_feedback}
                    Here is your conversation history: 

                    {conversation_history}

                    Analyze {name}'s proficiency in {language} based on the conversation history, providing 
                    insightful and constructive feedback and an updated proficiency score.
                    Your response:"""
    pass



