---
layout: post
title: "Fundamentals of Machine Learning Part 1: Convolution"
description: Learning fundamental components of neural network in depth
category: ml
tags: ml_fundamentals
---


* toc
{:toc .large-only}

# History of Convolutional neural network 

Neural networks have been around for very long time, with multi-layer perceptrons (MLP) being introduced by Marvin Minsky and Seymour Papert in 1969, and the gradient descent based backpropagation being published even before that. The potential of neural network, however, has only been truly realized in the past decade, with the astonishing advancement of computers and the datasets associated with it. In terms of 2D image recognition, the famous [ImageNet dataset](https://ieeexplore.ieee.org/document/5206848) was released in 2006, and the major breakthrough happened in 2012, when a convolutional neural network (CNN) designed by Alex Krizhevsky, published with Ilya Sutskever and Krizhevsky’s PhD advisor Hinton, halved the existing error rate on Imagenet visual recognition to 15.3 percent. The CNN was dubbed “AlexNet” in [this legendary paper](https://proceedings.neurips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf). 


<figure>
<img src="https://production-media.paperswithcode.com/methods/Screen_Shot_2020-06-22_at_6.35.45_PM.png" alt="osi">
<figcaption>The success of AlexNet changed the landscape of the Image recognition
</figcaption>
</figure>


The concept of ConvNets were first introduced in 1980s, but AlexNet was the first official discovery that deeply stacked ConvNets could be so effective in the image related tasks. It's been 10 years since the AlexNet paper was first released, and nowadays trasformer models are being adopted to vision related tasks too, yet CNN still remains as the mainstream due to its incredible efficiency. 

# Understanding CNN

When coding neural network, we use CNN blocks all the time. But it is extremely important to understand the mathemetics and the reason why they really work in practice. 

$$
\left(\int\mathrm{\bf:}\ g\right)\bigl({\cal t}\bigr)\longrightarrow\int_{-\infty}^{\infty}\int\!\!\left(T\right)g\bigl({\cal t}\longrightarrow T\bigr)d\tau
$$