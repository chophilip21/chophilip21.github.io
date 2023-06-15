from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "to be or not to be"}
