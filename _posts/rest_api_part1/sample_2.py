from fastapi import FastAPI
from pydantic import BaseModel
from router import app_router


class Movie(BaseModel):
    """Movie model"""

    id: int
    Name: str
    rating: str
    director: str


class Cinema(BaseModel):
    """Cinema model. Recursively use Movie model."""

    id: int
    Name: str
    location: str
    movies: list[Movie]


app = FastAPI()


@app.get("/")
async def welcome() -> dict:
    return {"message": "Hello World"}


app.include_router(app_router)
