from fastapi import FastAPI, HTTPException
from router import app_router
from model import *
from typing import List
import random
import uuid


# create a list of dummy movies
dummy_movies: List[Movie] = [
    Movie(
        id=1,
        Name="The Shawshank Redemption",
        rating=9.2,
        director="Frank Darabont",
        genre=MovieGenre.drama,
    ),
    Movie(
        id=2,
        Name="The Godfather",
        rating=9.2,
        director="Francis Ford Coppola",
        genre=MovieGenre.drama,
    ),
    Movie(
        id=3,
        Name="The Dark Knight",
        rating=9.0,
        director="Christopher Nolan",
        genre=MovieGenre.action,
    ),
    Movie(
        id=4,
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
        movies=random.sample(dummy_movies, 3),
    ),
    Cinema(
        id=str(uuid.uuid4()),
        Name="Cinema 2",
        location="Location 2",
        movies=random.sample(dummy_movies, 2),
    ),
]


app = FastAPI()


@app.get("/api/v1/get/movies", status_code=200)
async def get_all_movies():
    """Get all movies"""
    return dummy_movies


@app.get("/api/v1/get/cinemas", status_code=200)
async def get_all_cinemas():
    """Get all movies"""
    return cinema_list


@app.post("/api/v1/post/movies", status_code=201)
async def add_movie(movie: Movie):
    """Add a movie"""
    dummy_movies.append(movie)
    return {"id": movie.id, "message": "Movie added successfully"}


@app.delete("/api/v1/delete/movies/{movie_id}", status_code=200)
async def delete_movie(movie_id: str):
    """Delete a movie"""
    for movie in dummy_movies:
        # delete only when matches
        if movie.id == movie_id:
            dummy_movies.remove(movie)
            return {"id": movie.id, "message": "Movie deleted successfully"}
    raise HTTPException(status_code=404, detail="Movie not found")


@app.put("/api/v1/put/movies/{movie_id}")
async def update_movie(movie_id: str, movie_obj: Movie):
    """Update a movie"""
    for index, movie in enumerate(dummy_movies):
        if movie.id == movie_id:
            dummy_movies[index] = movie_obj
            return {"id": movie.id, "message": "Movie updated successfully"}
    raise HTTPException(status_code=404, detail="Movie not found")


app.include_router(app_router)
