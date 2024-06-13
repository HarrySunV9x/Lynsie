from langchain_core.runnables.history import RunnableWithMessageHistory

from prompt import lynsie_prompt, create_session_factory, InputChat
from model import llm_model
from prompt import translate_prompt
from langchain_core.output_parsers import StrOutputParser

output_parser = StrOutputParser()

lynsie_chain = lynsie_prompt | llm_model | output_parser

lynsie_chain_with_history = RunnableWithMessageHistory(
    lynsie_chain,
    create_session_factory("chat_histories"),
    input_messages_key="human_input",
    history_messages_key="history",
).with_types(input_type=InputChat)

translate_chain = translate_prompt | llm_model | output_parser
