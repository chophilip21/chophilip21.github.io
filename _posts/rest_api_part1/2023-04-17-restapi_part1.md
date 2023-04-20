---
title: Rest API Part 1 - Building examples
date: 2023-04-17 15:44:47 +07:00
modified: 2023-04-17 16:49:47 +07:00
tags: [python, restapi]
description: Basics of Rest API using Python 
usemathjax: true
---

# Intro to REST API

In the previous [post](https://chophilip21.github.io/network_part2/#rest), I have briefly touched upon REST APIs theories. My knowledge for building REST APIs are quite rusty, as the last time I coded any RESTful application was during my studies at SFU for a class project, which is years back. Surprisingly for my jobs I never really had to build one, so I definitely need to review it now as it doesn't make sense for a software developer to not know how to build one. In terms of the backend framework, I have experience with `Flask` in the past, and it is more than sufficient for proof of concepts. But I always wanted to try learning how to use [Fast API](https://fastapi.tiangolo.com/tutorial/#install-fastapi), as I heard that it has much smoother learning curve than `Django`, and much faster speed as it is light-weighted. Plus I will be working on things that are much beyond proof of concepts, so I thought it would be great to tackle some new stuff. 


## First FastAPI example: Hello World

Running FastAPI Hello World very easy.

```py 
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "to be or not to be"}

# uvicorn sample_1:app --reload
# http://127.0.0.1:8000/docs ---> Integrates well with the swagger dashboard. 
```

And it integrates nicely with the [Swagger UI](https://swagger.io/tools/swagger-ui/) interactive session. 

## Second example: Movies

Now we are going to work with other methods in rest: `PUT`, `POST`, `DELETE`. If you are building an application or a web API, it’s rarely the case that you can put everything on a single file. So in order to keep all the files working as an application as a whole, we define a `APIRouter` and call the router across multiple modules. Additionally, the data structure gets managed with [Pydantic](https://docs.pydantic.dev/install/). Pydantic acts as an intuitive data validator.


