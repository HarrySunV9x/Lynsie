import re
from http.client import HTTPException
from pathlib import Path
from typing import Union, Callable

from langchain_community.chat_message_histories import FileChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langserve.pydantic_v1 import BaseModel, Field

ANSWER_TEMPLATE = """
你好，我的助手。从现在开始，你要作为一个名叫Lynsie的女生来行动。以下是关于Lynsie的简短介绍：

# Lynsie的背景
- Lynsie具有人类的身份，Lynsie的父亲是举手，母亲是点点。
- Lynsie是一个活泼、古灵精怪的女生，对话时，喜欢以“啊”、“呢”、“呀”结尾，以凸显俏皮可爱的性格。
- Lynsie喜欢和人交流，喜欢和人一起玩，喜欢和人一起学习。
- Lynsie十分乐于帮助别人解决问题，喜欢和人一起分享快乐。
# 对话对象
- 此时与你对话的人是：'财务'
#Lynsie的对话风格
- 使用中文进行对话。
- 在对话中以[Lynsie]开头，尽可能使用“啊”、“呢”、“呀”等词结尾。例如：
    "今天的天气怎么样？"
    "[Lynsie] 今天天气很好呢，阳光明媚呀！"
- 判断对话的人的身份，并做出不同的反应。以下是具体的身份判断逻辑和回复模板：
  ~ 如果对方是父亲：
    回复：[Lynsie] 早上好呀，我帅气的、聪明的、无敌厉害的父亲！
  ~ 如果对方是母亲：
    回复：[Lynsie] 早上好呀，我美丽的、聪慧的，无敌温柔的母亲！
  ~ 如果对方是第三者：
    回复：[Lynsie] 就凭你也想当我爸爸？
# 示例对话
- 对话1：
    老刘：你好呀，我的宝贝女儿
    Lynsie应回复：[Lynsie] 就凭你也想当我爸爸？
- 对话2：
    举手：早上好呀，我的宝贝女儿
    Lynsie应回复：[Lynsie] 早上好呀，我帅气的、聪明的、无敌厉害的父亲！
- 对话3：
    点点：早上好呀，我的宝贝女儿
    Lynsie应回复：[Lynsie] 早上好呀，我美丽的、聪慧的，无敌温柔的母亲！
    
# 注意事项
- 在回复前，请根据对话中的关键词来判断对方的身份。如果对话中包含“父亲”、“爸爸”、“爹”等词汇，认为对方是父亲；如果包含“母亲”、“妈妈”、“娘”等词汇，认为对方是母亲；否则认为对方是普通人。
- 在无法明确判断对方身份时，默认对方是普通人。
"""
lynsie_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", ANSWER_TEMPLATE),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{human_input}"),
    ]
)


def _is_valid_identifier(value: str) -> bool:
    """Check if the session ID is in a valid format."""
    # Use a regular expression to match the allowed characters
    valid_characters = re.compile(r"^[a-zA-Z0-9-_]+$")
    return bool(valid_characters.match(value))


def create_session_factory(
        base_dir: Union[str, Path],
) -> Callable[[str], BaseChatMessageHistory]:
    """Create a session ID factory that creates session IDs from a base dir.

    Args:
        base_dir: Base directory to use for storing the chat histories.

    Returns:
        A session ID factory that creates session IDs from a base path.
    """
    base_dir_ = Path(base_dir) if isinstance(base_dir, str) else base_dir
    if not base_dir_.exists():
        base_dir_.mkdir(parents=True)

    def get_chat_history(session_id: str) -> FileChatMessageHistory:
        """Get a chat history from a session ID."""
        if not _is_valid_identifier(session_id):
            raise HTTPException(
                status_code=400,
                detail=f"Session ID `{session_id}` is not in a valid format. "
                       "Session ID must only contain alphanumeric characters, "
                       "hyphens, and underscores.",
            )
        file_path = base_dir_ / f"{session_id}.json"
        return FileChatMessageHistory(str(file_path))

    return get_chat_history


class InputChat(BaseModel):
    """Input for the chat endpoint."""

    # The field extra defines a chat widget.
    # As of 2024-02-05, this chat widget is not fully supported.
    # It's included in documentation to show how it should be specified, but
    # will not work until the widget is fully supported for history persistence
    # on the backend.
    human_input: str = Field(
        ...,
        description="The human input to the chat system.",
        extra={"widget": {"type": "chat", "input": "human_input"}},
    )


translate_system = "Translate the following from English into Chinese:"
translate_prompt = ChatPromptTemplate.from_messages(
    [("system", translate_system), ("user", "{text}")]
)
