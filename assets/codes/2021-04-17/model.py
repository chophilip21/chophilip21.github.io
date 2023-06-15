from pydantic import BaseModel
from typing import Optional, Union
from enum import Enum


class MovieGenre(str, Enum):
    """Movie genre enum"""

    action = "action"
    comedy = "comedy"
    horror = "horror"
    romance = "romance"
    thriller = "thriller"
    drama = "drama"


class Movie(BaseModel):
    """Movie model"""

    id: Optional[str] = None  # Optional[int] is equivalent to Union[int, None]
    Name: str
    rating: Union[int, float]  # use Union to allow multiple types
    director: str
    genre: MovieGenre  # use MovieGenre enum


class Cinema(BaseModel):
    """Cinema model. Recursively use Movie model."""

    id: Optional[str] = None  # Optional[int] is equivalent to Union[int, None]
    Name: str
    location: str
    movies: list[Movie]  # use list[Movie] to specify a list of Movie objects
