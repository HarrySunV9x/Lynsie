from input import _inputs, ChatHistory
from answer import ANSWER_PROMPT
from question import _question

conversational_qa_chain = (
        _inputs | _question | ANSWER_PROMPT
)
chain = conversational_qa_chain.with_types(input_type=ChatHistory)