from fastapi import FastAPI
import subprocess
from contextlib import asynccontextmanager
import os
import time
import threading
import psutil
# import denoise as dn
# import coremltools as ct


# save the models here.
ml_models = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Management start/end process of the server."""
    # Load the ML model
    denoise_fp16_coreml_model = ct.models.MLModel('model/fp_16_denoise_v1.mlmodel')

    ml_models["denoise_coreml_fp16"] = denoise_fp16_coreml_model
    yield
    # Clean up the ML models and release the resources
    ml_models.clear()


app = FastAPI(lifespan=lifespan)

@app.get("/")
def root():
    """Root entry point."""
    return {"message": "Hello World!"}

def graceful_terminate():
    """Attempts to kill the server gracefully."""
    time.sleep(1)
    print('attempting to kill the server gracefully.')
    parent = psutil.Process(psutil.Process(os.getpid()).ppid())

    #kill all the prcoess gracefully.
    for child in parent.children(recursive=True):
        child.kill()

    parent.kill()

@app.get("/api/v1/models/")
def get_models():
    """Returns the list of available models."""
    return {"models": list(ml_models.keys())}

@app.post("/kill")
async def kill():
    """Endpoint that can be invoked to kill the server."""
    threading.Thread(target=graceful_terminate, daemon=True).start()
    return {"success": True}

# @app.post("/api/v1/models/denoise/{bytes}")
# async def inference(bytes: bytes):
#     """Endpoint that can be invoked to kill the server."""

#     return {"success": True}

if __name__ == "__main__":
    print('Starting up the server')
    
    #start the server
    subprocess.run('uvicorn server:app --reload', shell=True)
