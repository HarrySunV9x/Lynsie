from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langserve import add_routes
from chain import lynsie_chain, translate_chain

app = FastAPI(
    title="Lynsie Langchain API Server",
    version="1.0",
    description="A simple api server using Langchain's Runnable interfaces",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

add_routes(
    app,
    lynsie_chain,
    path="/lynsie",
)

add_routes(
    app,
    translate_chain,
    path="/translate",
)
