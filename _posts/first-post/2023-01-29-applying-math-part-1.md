---
layout: post
title: Applying basic math concepts using Numpy-Part 1
date: 2023-01-29 01:00 +0700
modified: 2023-02-21 16:49:47 +07:00
description: Learn how to apply basic mathematics operations using Python library
tag:
  - math
  - python
  - basics
  - numpy
image: https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg
---

Machine Learning (ML) applications are most commonly written in Python, but every single concepts involoved in it is based on Mathematics. Math is the engine of ML application, and the Python codes are its wheels. Without knowing them both in detail, all the way from the fundamentals, you cannot say that you are truly a ML Engineer. On these blog mosts related to basics, I aim to explain basic Linear Algebra, Probability concepts, and then solidify the understanding by applying some of the popular libraries like `Numpy`, `Scipy` and `Pytorch`, which are most widely used in this field. These blog posts are written purely for the purpose of my own education, but if this could benefit anyone, that would be great as well.             

The code that are used in this repository will go into this [notebook](https://github.com/chophilip21/chophilip21.github.io/blob/master/_posts/first-post/matrices.ipynb)

### Numpy basics. 

Most of us use `Numpy` in a daily basis but few of us really think about the reason behind using it. Why do we even bother using it? First of all, Numpy, which stands for Numerical Python, is extremely fast in terms of computation. This is because most of the parts that require fast computation are written in C or C++, easily outperforming pure Python based computations using default datatypes. 

Furthermore, we always deal with N-dimensional arrays in ML, and Numpy offers extremely memory efficient array representation, and convenient array based operations which makes mathematical computations very straight forward. 

 
#TODO Add time difference

```py
def test():
    return 100, "foo"

someNumber, someString = test()
```
