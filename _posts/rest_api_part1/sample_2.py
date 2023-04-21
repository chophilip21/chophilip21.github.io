from fastapi import FastAPI
from router import app_router
from model import *
from typing import List
import random
import uuid

# create a list of dummy movies
dummy_movies: List[Movie] = [
    Movie(
        id=str(uuid.uuid4()),
        Name="The Shawshank Redemption",
        rating=9.2,
        director="Frank Darabont",
        genre=MovieGenre.drama,
    ),
    Movie(
        id=str(uuid.uuid4()),
        Name="The Godfather",
        rating=9.2,
        director="Francis Ford Coppola",
        genre=MovieGenre.drama,
    ),
    Movie(
        id=str(uuid.uuid4()),
        Name="The Dark Knight",
        rating=9.0,
        director="Christopher Nolan",
        genre=MovieGenre.action,
    ),
    Movie(
        id=str(uuid.uuid4()),
        Name="Lost in translation",
        rating=8.3,
        director="Sofia Coppola",
        genre=MovieGenre.romance,
    ),
]

# create a list of dummy cinemas
cinema_list: List[Cinema] = [
    Cinema(
        id=str(uuid.uuid4()),
        Name="Cinema 1",
        location="Location 1",
        movies=random.choices(dummy_movies, k=3),
    ),
    Cinema(
        id=str(uuid.uuid4()),
        Name="Cinema 2",
        location="Location 2",
        movies=random.choices(dummy_movies, k=2),
    ),
]


app = FastAPI()


@app.get("/api/v1/movies", status_code=200)
async def get_all_movies():
    """Get all movies"""
    return dummy_movies


@app.get("/api/v1/cinemas", status_code=200)
async def get_all_cinemas():
    """Get all movies"""
    return cinema_list


@app.post("/api/v1/cinemas", status_code=200)
async def add_movie(movie: Movie):
    """Add a movie"""
    dummy_movies.append(movie)
    return {"id": movie.id, "message": "Movie added successfully"}


app.include_router(app_router)
