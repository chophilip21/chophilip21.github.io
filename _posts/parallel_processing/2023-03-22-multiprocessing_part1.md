---
title: Python Concurrency Part 1 - Multiprocesing
date: 2023-03-22 15:00:00 +07:00
tags: [python, concurrency, multiprocessing]
description: Note for parallel processing
---

# 1.0 - Multiprocessing and Threading with Python

As a Machine Learning/Data Engineer, I am in charge of designing and maintaining `Extraction, Transformation and Load (ETL)` pipeline for our company's Machine Learning (ML) training data that consists of millions of images and metadata. 

<figure>
<img src="https://www.estuary.dev/wp-content/uploads/2022/10/01-etl-pipelines-what-is-an-etl-pipeline.png" alt="etl">
<figcaption>A typical ETL pipeline</figcaption>
</figure>

The pool of image data typically resides in the local NAS storage, and they often require to be copied over to the cloud storage (AWS S3), and its metadata needs to be extracted and mapped to the relational database. Because of the sheer volume of the data, and I/O and CPU bound limitations, it's impossible to process everything in a single process as it would take forever. Having an eifficient and stable `multiprocessing` pipleine is critical, but I have been relying on legacy codes to get by, without having a solid understanding behind it. For example:
- How is `multiprocessing.pool` different from `concurrent.futures`? 
- How does `threading` work in Python? 
- How do you ensure there is no `race condition`, `deadlock` or `Starvation`?

This is a complex topic and I would like to share what I learned in this post.    

## 1.1 - Multiprocessing and Threading

Many people misleadingly use multiprocessing and threading interchangeably, whereas there are not actually the same.  

<figure>
<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*hZ3guTdmDMXevFiT5Z3VrA.png" alt="etl">
<figcaption>Threading vs Multiprocessing</figcaption>
</figure>

Above illustration is a very nice overview of the difference b/w threading and multiprocessing. 

First of all, **threading is a great way to speed up application to tackle I/O bound problems**, where threads within a single process run parallely. For example, say you have a multi-stage pipeline in your application where user interacts with the server. If there is a significant bottleneck in one of the stages, and your process is only running sequentially, it will take much longer time to finish all the process since the bottleneck process needs to be completed before moving on to the next stage. However, if the process is running concurrently, the entire application should not take much longer than the time required to execute the bottleneck process. 

**Python Global Interpreter Lock (GIL)**

Multi-threading is within a single process, thus multiple threads share the same code, data, and files, and it's much safer compared to `multiprocessing`. But you need to understand that **using multithreading for CPU-bound processes might slow down performance due to competing resources that ensure only one thread can execute at a time, and overhead is incurred in dealing with multiple threads.**. Unlike multiprocessing that creates interpreter for each processes, `Python Global Interpreter Lock (GIL)` becomes a painful bottleneck in CPU intensive process when using multi-threading. GIL is a mutex that protects access to single Python objects, preventing multiple threads from executing Python bytecodes at once. This ensures everything is `thread-safe`, where threads can access the same data structures securely because a synchronization mechanism always keeps data structures in a consistent state. But this causes everything to slow down. 

<figure>
<img src="https://pbs.twimg.com/media/EZzAw78WAAE7d_D.jpg" alt="etl">
<figcaption>Python GIL makes process thread safe, but slows things down</figcaption>
</figure>

This is why we have `Multi-processors`. When the program is CPU intensive and doesn’t have to do any IO or user interaction, you can use multiprocessors to exponentially speed up the computation by breaking down the problem into chunks, and delegating each cores to handle the chunks. More processes can be created if your computer has more cores. It becomes less scalable when your spin up more processes than the number of cores in your computer. 


# 2.0 - Python Multiprocessor

Now that we have covered the basics, it's time to dive in. In this post, I will cover [multiprocessing library](https://docs.python.org/3/library/multiprocessing.html), which is the core Python modules for multiprocessing. Here is a great overview [tutorial](https://towardsdatascience.com/multiprocessing-in-python-9d498b1029ca) for more info. Multiprocessing library offers four major parts: Process, Locks, Queues and Pools.  

<figure>
<img src="https://cdn.educba.com/academy/wp-content/uploads/2020/02/Python-Multiprocessing-2.jpg" alt="4 pillars">
<figcaption>Process, Locks, Queues and Pools are the four major part of mp. </figcaption>
</figure>
