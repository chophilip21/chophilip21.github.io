from fastapi import FastAPI
from pydantic import BaseModel


class Movie(BaseModel):
    id: int
    Name: str
    rating: str
    director: str
