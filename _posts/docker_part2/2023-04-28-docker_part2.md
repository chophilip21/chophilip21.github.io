---
title: Docker part 2 - Kubernetes, guide to improving applications
date: 2023-04-28 11:58:47 +07:00
modified: 2023-05-01 16:49:47 +07:00
tags: [docker, Python, microservice, Kubernetes]
description: Improving the microservice applications in various ways
usemathjax: true
---


# Table of contents
- [How can you improve? Kubernetes](#preface)

# 1.0 - How can you improve? Kubernetes<a name="preface"></a>

[In the previous post](https://chophilip21.github.io/docker_part1/), I created a simple service that summarizes news contents using ML model, [Streamlit](https://streamlit.io/) and Docker Compose. Well there must be ways to improve the application, as that application was mostly built on top of what I already knew about Docker. What are the next step for improving the application? Well the direction is quite clear, as there is an evident limitations with the current approach of using Docker Compose. **It works for testing locally on my computer, but it's not scalable in the production**, as it's meant to run on a single host. To summarize:

- You can implement health checks, but it won't recreate containers when it fail (absence of self-healing)
- Absence of proper load balancer
- Docker Compose is designed to run on a single host or cluster, while Kubernetes is more agile in incorporating multiple cloud environments and clusters.
- Kubernetes is easier to scale beyond a certain point plus you can utilize native services of AWS ,Azure and GCP to support our deployment.

[Docker Swarm](https://docs.docker.com/engine/swarm/) and [Kubernetes](https://kubernetes.io/) are two possible options, but for scalability and compatibility, Kubernetes should be pursued. 