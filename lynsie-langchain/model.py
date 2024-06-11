from langchain_community.llms import Ollama

llm_model = Ollama(model="llama3", base_url="http://host.docker.internal:11434")
