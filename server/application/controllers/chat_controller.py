from langchain.prompts.chat import ChatPromptTemplate, SystemMessagePromptTemplate, MessagesPlaceholder
from application.services.database_service import db_client, get_user_data, get_user_last_proficiency_by_language, create_proficiency_record
from application.services.nlp_service import chat_model, analysis_model
from application.utils.parse_conversation import parse_conversation
import logging




def get_chat_response(conversation_history, user_id, language):
    conversation_history = parse_conversation(conversation_history)
    name, previous_knowledge, interests = get_user_data(user_id)
    previous_proficiency_score, previous_proficiency_feedback = get_user_last_proficiency_by_language(user_id, language)

    template = """You are a language expert in {language} who is doing having a conversation with, {name}. 
                        This is their interests: {interests}
                        This is their previous proficiency feedback in {language}: {previous_proficiency_feedback}
                        """

    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    prompt = ChatPromptTemplate.from_messages([system_message_prompt, MessagesPlaceholder(variable_name="messages")])

    chain = prompt | chat_model

    response = chain.invoke(
        {
            "language": language,
            "name": name,
            "interests": interests,
            "previous_proficiency_feedback": previous_proficiency_feedback,
            "messages": conversation_history,
        }
    )
    response_text = response.content
    return response_text



def analyze_conversation_proficiency(conversation_history, user_id, language):
    conversation_history = parse_conversation(conversation_history)
    name, previous_knowledge, interests = get_user_data(user_id)
    previous_proficiency_score, previous_proficiency_feedback = get_user_last_proficiency_by_language(user_id, language)
    template = """You are a language expert in {language} who finished having a conversation with, {name}.
                    This is their previous proficiency level in {language}: {previous_proficiency_score}
                    This is their previous proficiency feedback in {language}: {previous_proficiency_feedback}
                    Analyze {name}'s proficiency in {language} based on the conversation history, providing 
                    insightful and constructive feedback and an updated proficiency score. Please provide the feedback in english.
                    The updated proficiency score should be an integer. If there was no previous proficiency score, provide a 
                    proficiency score based on the conversation history, starting from 0.

                    Your response should be in the following format:
                    Proficiency Score: [score]
                    Feedback: [feedback]
                    """

    system_message_prompt = SystemMessagePromptTemplate.from_template(template)
    prompt = ChatPromptTemplate.from_messages([system_message_prompt, MessagesPlaceholder(variable_name="messages")])

    chain = prompt | analysis_model

    response = chain.invoke(
        {
            "language": language,
            "name": name,
            "interests": interests,
            "previous_proficiency_feedback": previous_proficiency_feedback,
            "previous_proficiency_score": previous_proficiency_score,
            "messages": conversation_history,
        }
    )

    response_text = response.content

    print(response_text)
    try:
        # Parse the response to get the proficiency score and feedback
        lines = response_text.split('\n')
        proficiency_score = int(lines[0].split(': ')[1])
        feedback = lines[1].split(': ')[1]

        create_proficiency_record(user_id, language, proficiency_score, feedback)
        return proficiency_score, feedback
    except Exception as e:
        logging.error(f"Failed to analyze proficiency: {e}")
        return None, None



