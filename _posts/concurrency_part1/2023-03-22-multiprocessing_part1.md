---
title: Python Concurrency Part 1 - Multiprocesing
date: 2023-03-22 15:00:00 +07:00
tags: [python, concurrency, multiprocessing]
modified: 2023-05-02 16:49:47 +07:00
description: Note for parallel processing
---

# Table of contents
- [Why is Pyhon so slow?](#preface)
- [Global Interpreter Lock (GIL)](#gil)
- [Multiprocessing and Threading](#concurrency)
- [Python Multiprocessing: Process](#multiprocessing)
- [Python Multiprocessing: lock](#lock)
- [Python Multiprocessing: queue](#queue)
- [Python Multiprocessing: queue](#pool)


# 1.0 - Why is Pyhon so slow? <a name="preface"></a>
 
With the background in Machine Learning, the natural choice of programming language for me was Python, which was (and still is) overwhelming popular, and the most dominant language in the field of Machine Learning. I have already spent years programming in Python, and I really love the Zen of Python. Like any other programming languages, however, Python is not perfect. Python is innately slower than modern compiled languages like Go, Rust, and C/C++, because it sacrified speed for easier usage and more readable code. But why is it slow exactly?

Common characteristics of Python are:
- Interpreted language
- Dynamically typed
- GC Enabled Language 

If you ever studied languages like C++, you know of course that compiled languages have characteristics exactly opposite of above. C compilers like GNU will convert the source code into Machine Code, and generates executables that gets directly ran by CPU. Python, on the other hand, does not provide this compile step. The source code gets executed directly, at which Python will compile the source code into bytecode that can be read by `Interpreters`, where bytecode instructions are executed on a Virtual Machine, **line by line**. It can only be executed line by line because the language is **dynamically typed**. Because we don’t specify the type of a variable beforehand, we have to wait for the actual value in order to determine whether what we’re trying to do is actually legal. These errors cannot be caught during compile time, because the validity can only be checked by the Interpreter.  

When learning C/C++, something that always makes you bang your head on the wall is the memory management--**Notorious Segmentation Fault Error**. Python has automatic garbage collecting, so you never have to worry about things like pointers, but it's definitely not the most efficient way to handle memory. You can never shoot yourself in the foot, but it slows you down at the same time.  

# 1.1 - Global Interpreter Lock (GIL) <a name="gil"></a>

Another factor that slows Python down is `Global Interpreter Lock (GIL)`.
By design, Python operates on single-thread, on a single CPU. Since the GIL allows only one thread to execute at a time even in a multi-threaded architecture with more than one CPU core, you may wonder why in the world that Python Developers created this feature. 


<figure>
<img src="https://pbs.twimg.com/media/EZzAw78WAAE7d_D.jpg" alt="etl">
<figcaption>Python GIL makes process thread safe, but slows things down</figcaption>
</figure>

GIL solves a race-condition where multiple threads try to access and modify a single point of memory, which causes memory leak and also sorts of bugs that Python cannot handle. This was practical solution as Python manages memory for you, and earlier Python did not even have the concept of threading. 

Languages like Rust guarantees thread safety (no multiple threads accessing same variables at the same time) using similar concepts for memory safety and provides standard library features like channels, mutex, and ARC (Atomically Reference Counted) pointers. Python's GIL does not gaurantee thread-safety, obviously because it's making one thread take all the resources. So is there concept of multi-threading in Python? yes of course. This will be discussed in the next section.  


# 2.0 - Multiprocessing and Threading <a name="concurrency"></a>

In the previous few sections I have discussed the limitations of Python. Some of these problems are simply impossible to overcome due to the nature of Python, but Python has made continuous improvements in many areas and thus it stands where it is right now. Many popular Python packages (and pretty much all ML libraries) are written in C to offer competitive speed, and now Python supports libraries for multi-processing and threading, which gives additional boost to the speed. This blog post will introduce various aspects of multi-processing and multi-threading. 

Many people misleadingly use multiprocessing and threading interchangeably, whereas there are not actually the same.  

<figure>
<img src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*hZ3guTdmDMXevFiT5Z3VrA.png" alt="etl">
<figcaption>Threading vs Multiprocessing</figcaption>
</figure>

Above illustration is a very nice overview of the difference b/w threading and multiprocessing. 

First of all, **threading is a great way to speed up application to tackle I/O bound problems**, where threads within a single process run parallely. For example, say you have a multi-stage pipeline in your application where user interacts with the server. If there is a significant bottleneck in one of the stages, and your process is only running sequentially, it will take much longer time to finish all the process since the bottleneck process needs to be completed before moving on to the next stage. However, if the process is running concurrently, the entire application should not take much longer than the time required to execute the bottleneck process. 

This is why we have `Multi-processors`. When the program is CPU intensive and doesn’t have to do any IO or user interaction, you can use multiprocessors to exponentially speed up the computation by breaking down the problem into chunks, and delegating each cores to handle the chunks. More processes can be created if your computer has more cores. It becomes less scalable when your spin up more processes than the number of cores in your computer. 


## 2.1 - Python Multiprocessing: Process <a name="multiprocessing"></a>

Now that we have covered the basics, it's time to dive in. In this post, I will cover [multiprocessing library](https://docs.python.org/3/library/multiprocessing.html), which is the core Python modules for multiprocessing. I have already used multiprocessing to some extent for work (for database migration), so it would be easier to start from something that I am familiar with. Multiprocessing library offers four major parts: 
1. Process 
2. Locks 
3. Queues
4. Pools  

<figure>
<img src="https://cdn.educba.com/academy/wp-content/uploads/2020/02/Python-Multiprocessing-2.jpg" alt="4 pillars">
<figcaption>Process, Locks, Queues and Pools are the four major pillars of mp. </figcaption>
</figure>

`Process` is the most basic unit of execution in Python. Every process has its copy of the Python interpreter and its memory space, allowing multiple jobs to get executed simultaneously without conflicts. The multiprocessing.Process instance then provides a Python-based reference to this underlying native process.




## 2.2 - Python Multiprocessing: Locks <a name="lock"></a>
## 2.3 - Python Multiprocessing: Queues <a name="queue"></a>
## 2.4 - Python Multiprocessing: Pools <a name="pool"></a>



