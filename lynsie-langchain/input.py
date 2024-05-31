from typing import Tuple, List
from langchain_core.output_parsers import StrOutputParser
output_parser = StrOutputParser()
from langchain.prompts.prompt import PromptTemplate
from langchain.schema.runnable import RunnableMap, RunnablePassthrough
from langserve.pydantic_v1 import BaseModel, Field
from model import llm_model

_TEMPLATE = """鉴于以下对话和后续问题，请将后续问题重新表述为一个独立的问题

历史对话:
{chat_history}
Follow Up Input: {question}
Standalone question:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_TEMPLATE)

def _format_chat_history(chat_history: List[Tuple]) -> str:
    """Format chat history into a string."""
    buffer = ""
    for dialogue_turn in chat_history:
        human = "Human: " + dialogue_turn[0]
        ai = "Assistant: " + dialogue_turn[1]
        buffer += "\n" + "\n".join([human, ai])
    return buffer

_inputs = RunnableMap(
    standalone_question=RunnablePassthrough.assign(
        chat_history=lambda x: _format_chat_history(x["chat_history"])
    )
                        | CONDENSE_QUESTION_PROMPT
                        | llm_model
                        | StrOutputParser(),
)

class ChatHistory(BaseModel):
    """Chat history with the bot."""

    chat_history: List[Tuple[str, str]] = Field(
        ...,
        extra={"widget": {"type": "chat", "input": "question"}},
    )
    question: str

