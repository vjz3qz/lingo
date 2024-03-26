from langchain.prompts.chat import ChatPromptTemplate, SystemMessagePromptTemplate, MessagesPlaceholder
from application.services.database_service import db_client, get_user_data, get_user_last_proficiency_by_language, create_proficiency_record
from application.services.nlp_service import chat_model, analysis_model
from application.utils.parse_conversation import parse_conversation, parse_conversation_as_string
import logging
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import PromptTemplate



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



class ProficiencyOutput(BaseModel):
    proficiency_score: int = Field(description="Updated proficiency score The updated proficiency score should be an integer. If there was no previous proficiency score, provide a proficiency score based on the conversation history, starting from 0.",
        ge=0)
    feedback: str = Field(description="Feedback on proficiency. Analyze the user's proficiency in the specified language based on the conversation history, providing insightful and constructive feedback. Please provide the feedback in english.")


def analyze_conversation_proficiency(conversation_history, user_id, language):
    try:
        conversation_history_string = parse_conversation_as_string(conversation_history)
        name, previous_knowledge, interests = get_user_data(user_id)
        previous_proficiency_score, previous_proficiency_feedback = get_user_last_proficiency_by_language(user_id, language)

        parser = PydanticOutputParser(pydantic_object=ProficiencyOutput)

        # Prompt
        prompt = PromptTemplate(
            template="You are a language expert in {language} who finished having a conversation with, {name}.\n"
                    "This is their previous proficiency level in {language}: {previous_proficiency_score}\n"
                    "This is their previous proficiency feedback in {language}: {previous_proficiency_feedback}\n"
                    "Analyze {name}'s proficiency in {language} based on the conversation history, providing insightful and constructive feedback and an updated proficiency score.\n"
                    "{format_instructions}\n"
                    "Conversation History: {messages}",
            input_variables=["language", "name", "previous_proficiency_score", "previous_proficiency_feedback", "messages"],
            partial_variables={"format_instructions": parser.get_format_instructions()},
        )

        system_message_prompt = SystemMessagePromptTemplate.from_template(prompt.template)
        prompt = ChatPromptTemplate.from_messages([system_message_prompt])

        chain = prompt | analysis_model | parser

        response = chain.invoke(
            {
                "language": language,
                "name": name,
                "previous_proficiency_feedback": previous_proficiency_feedback,
                "previous_proficiency_score": previous_proficiency_score,
                "messages": conversation_history_string,
                "format_instructions": parser.get_format_instructions(),  # Add this line
            }
        )

        # Access the parsed output
        updated_proficiency_score = response.proficiency_score
        feedback = response.feedback

    except Exception as e:
        logging.error(f"Error analyzing conversation proficiency: {e}")
        return None, None

    try:
        create_proficiency_record(user_id, language, updated_proficiency_score, feedback)
        return updated_proficiency_score, feedback
    except Exception as e:
        logging.error(f"Failed to create proficiency record: {e}")
        return updated_proficiency_score, feedback