from prompt import _inputs, ChatHistory, ANSWER_PROMPT, _question
from model import llm_model
from prompt import translate_prompt
from langchain_core.output_parsers import StrOutputParser

output_parser = StrOutputParser()

conversational_qa_chain = (
        _inputs | _question | ANSWER_PROMPT | llm_model | output_parser
)
lynsie_chain = conversational_qa_chain.with_types(input_type=ChatHistory)
translate_chain = translate_prompt | llm_model | output_parser
