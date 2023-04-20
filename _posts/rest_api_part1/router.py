from fastapi import APIRouter

app_router = APIRouter()


@app_router.get("/router")
async def say_hello() -> dict:
    return {"message": "Welcome to the router."}
