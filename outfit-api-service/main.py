from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import outfit, post, stars

import os

app = FastAPI()
app.include_router(outfit.router)
app.include_router(post.router)
app.include_router(stars.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
