---
title: Rest API Part 1 - Building examples
date: 2023-04-17 15:44:47 +07:00
modified: 2023-04-17 16:49:47 +07:00
tags: [python, restapi]
description: Basics of Rest API using Python 
usemathjax: true
---

# Intro to REST API

In the previous [post](https://chophilip21.github.io/network_part2/#rest), I have briefly touched upon REST APIs theories. My knowledge for building REST APIs are quite rusty, as the last time I coded any RESTful application was during my studies at SFU for a class project, which is years back. Surprisingly for my jobs I never really had to build one, so I definitely need to review it now as it doesn't make sense for a software developer to not know how to build one. For the framework, I have experience with `Flask` in the past, and it is more than sufficient for proof of concepts. There is no need to go for more sophisticated options like `Fast API` or `Django`, as I am not trying to build a full-stack application here.  


## First example: Hello World

**We have learned about the basics of networking, and I now know that Flask listens on a TCP socket, and exchanges HTTP requests/response in the format of JSON, like any other RESTful frameworks do**. And setting up basic examples on Flask is dead easy, almost 0 learning curve. `Flask-RESTful` is just an extension for Flask that adds support for quickly building REST APIs. It is a lightweight abstraction that works with your existing ORM/libraries. Flask-RESTful encourages best practices with minimal setup. If you are familiar with Flask, Flask-RESTful should be easy to pick up. <i>This avoids having to set up index, route, and all that that is normally required for flask webapps</i>.

```py
from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)

api = Api(app)

class Helloworld(Resource):

	def __init__(self):

		pass

	def get(self):

		return {
			"Hello": "World"
		}

api.add_resource(Helloworld, '/')

if __name__ == '__main__':

	app.run(debug=True)
```

Clients can get this response anytime via localhost url:

```py
import requests
url = "http://127.0.0.1:5000/"
response = requests.get(url=url)
print(response.text)
```

You should get the same JSON respose. 


