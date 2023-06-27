---
layout: post
title: Image Sorting and Composition Assessment Part 1 - Online Learning
description: Approaching photo quality assessment from Machine Learning point of view
tags: image-processing
---

* toc
{:toc .large-only}

# Image Quality Assessment overview

Processing of 2D images are one of the most robust fields within Machine Learning due to high availability of the data. Image quality assessment (IQA) for 2D images is an important area within 2D image processing, and it has many practical applications, one being `Photo culling`. Photo Culling is a tedious, time-consuming process through which photographers select the best few images from a photo shoot for editing and finally delivering to clients. Photographers take thousands of photo in a single event, and they often manually screen photos one by one, spending hours of effort. Criteria that photographers look for is:

**Closed eyes**

<figure>
<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*D4KatRb8F0m34qcZWjLDYw.png" alt="osi">
<figcaption>You always want subject to have eyes open.
</figcaption>
</figure>


**Noise level**

<figure>
<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*bHAjD5ohBnA0-g7QZyg_PA.png" alt="osi">
<figcaption>Images can be noisy when there is motion in the subject or the camera itself. 
</figcaption>
</figure>


**Near duplicate images**

<figure>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*Hk7xrHkIYW2bFw92NlbEMw.png" alt="osi">
<figcaption>Photographers often take images in burst, and there will be many unwanted duplicates.
</figcaption>
</figure>


**Proper light**

<figure>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*WNNdcPwpXLcPauRcNQMYvQ.png" alt="osi">
<figcaption>Selecting images with adequate lighting and good color composition
</figcaption>
</figure>


**Rule of thirds**

<figure>
<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*phGl2asutfUrJqzUON4Hdw.png" alt="osi">
<figcaption>Photographers often place the subject according to rule of third. Composition can be subjective and often varies according to the purpose of the photo.
</figcaption>
</figure>


**Poses, emotion**

<figure>
<img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*Z3sm_o_gblzISnU_eegUyQ.png" alt="osi">
<figcaption>This is also subjective, but photographers would look for certain poses and emotion when selecting photos, and will select the ones that look most natural to them. </figcaption>
</figure>


## Machine learning and IQA

IQA is definitely one of the areas where Machine Learning algorithms can excel at. However, there are many criterias (defined above) that it must fulfill, and the biggest hurdle is that because every photographers have different preferences, you cannot expect one pretrained model to satisfy all the end users. We should implement `Continual Learning (CL)` process, so that we do not have to retrain entire pipeline of models from scratch. When the end user performs his own version of the culling process based on the suggestions of the pretrained model, this should become the new stream of data for CL training. The original IQA model should be tuned according to this new data, with the aim to minimize training time and the catastrophic forgetting, where the model forgets what it learned before the CL process began.     

Now, we need to think about the architecture of this entire pipeline. First, it may be difficult to combine IQA and near-duplicate detevction (NDD) models together. Intuitively, a NDD model should break down the images into N set of images, and within each set, IQA will determine the quality of images. And there must be CL algorithm on top of everything. Ideally, NDD and IQA both should be continuously trainable, if not, at least the IQA portion of the pipeline should be trainable.  

Another thing to consider is `EXIF data`. EXIF (Exchangeable Image File Format) files store important data about photographs. Almost all digital cameras create these data files each time you snap a new picture. An EXIF file holds all the information about the image itself — such as the exposure level, where you took the photo, and any settings you used. Apart from the photo itself, EXIF data could have important details for NDD and IQA. We must see if there is any improvement in the result when we incorporate the EXIF data. It could be totally unnecessary, just making network heavy. But it could prove to be useful as well. 

Now, in terms of the representation of the architecture, something like below could make sense:

<figure>
<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*HSd_CLq1VB9PepYF_hoshw.png" alt="osi">
<figcaption> Possible ideas for IQA and NDD portion of the architecture. Referenced from https://utorontomist.medium.com/photoml-photo-culling-with-machine-learning-908743e9d0cb. </figcaption>
</figure>

NDD and IQA, I do already have some idea as to how they would work even before doing proper research, but the idea of continuous learning is very vague to me. How are these supposed to be implemented? Does it work on any architecture? What are the limitations? 

I feel like it would only make sense for me to look into IQA and NDD closely after having better grasp of CL. Therefore, for the first part of the post, I will checkout Continous Learning. 


# Lifelong Learning (LL)

If you think about how humans learn, We always retain the knowledge learned in the past and use it to help future learning and problem solving. When faced with a new problem or a new environment, we can adapt our past knowledge to deal with the new situation and also learn from it. The author of [Lifelong Machine Learning](https://www.cs.uic.edu/~liub/lifelong-machine-learning.html) defines the process to imitate this human learning process and
capability as `Lifelong learning (LL)`. He lays out these criteria for LL:

- (a) continuous learning process,
- (b) knowledge accumulation and maintenance in the KB,
- (c) the ability to use the accumulated past knowledge to help future learning,
- (d) the ability to discover new tasks, and
- (e) the ability to learn while working or to learn on the job.

According to his definition, terms like `Online learning` and `continual learning` are subsets of LL. But what I noticed from research is that the boundary of these expressions are extremely fuzzy, and many papers and articles mix these terms up. So I am referring to a definition that sounded most clear to me. 

## Online Learning overview 

What is Online Learning? Online learning (OL), is a learning paradigm where the training data points arrive in a sequential
order. When a new data point arrives, the existing model is quickly updated to produce the best
model so far. In online learning, if whenever a new data point arrives re-training using all the available
data is performed, it will be too expensive. Furthermore, during re-training, the model being
used is already out of date. Thus, online learning methods are typically memory and run-time
efficient due to the latency requirement in a real-world scenario.

Much of the online learning research focuses on one domain/task. <b>Objective is to learn more efficiently with the data arriving incrementally. LL, on the other hand,
aims to learn from a sequence of different tasks, retain the knowledge learned so far, and use the knowledge to help future task learning. Online learning does not do any of these</b>


## Continual learning overview

Continual learning is also a subset of LL. But it turns out that I have been perceiving the terms are actually incorrect.

<figure>
<img src="assets/img/2023-06-25/scenarios.png" alt="osi">
<figcaption> In CL, there are three possible scenarios. For more info, refer to </figcaption>
</figure>

The concept of OL is simple. The sequence of data gets unlocked in every stage, and the training is performed sequentially to make model more robust. Continual learning, however, is much more sophisticated, as number of tasks are increasing, the domain shifts completely, and number of classes change from training round `T` to `T+1` to `T+n`. 

Above is not what we are intending to do, as number of labels of IQA will not increase or decrease, and data will be all similar type of portrait photography. We won't ask the model to perform a new type of tasks, such as doing instance segmentation on the images. <b>There is little doubt that we need to look for online learning algorithms </b> 


# Types of Online learning algorithm

My conclusion is that although some authors make clear distinctions b/w `Online learning` and `Continual Learning`, some papers like [this](https://arxiv.org/pdf/2206.11849v1.pdf) uses terms like `Online Continual Learning`, combining two concepts into one. So there is no real meaning of discarding a paper because it says `Continuous learning` in the title, and the only way you can tell if a paper is suitable for your needs, is to actually skim through the paper itself. Regardless of being OL or CL, these properties are shared:

1. Online model parameter adaptation: How to update
the model parameters with the new data?
2. Concept drift: How to deal with data when the data
distribution changes over time?
3. The **stability-plasticity dilemma**: If the model is too
stable, it can’t learn from the new data. When the model
is too plastic, it forgets knowledge learned from the old
data. How to balance these two?
4. Adaptive model complexity and meta-parameters:
The presence of concept drift or introducing a new class
of data might necessitate updating and increasing model
complexity against limited system resources

So the main challenge, as everyone agrees, is to make model plastic enough to learn due data, but stable enough to not forget the previously gained knowledge. Finding this balance is the key to online learning. Now we look at some of the methods.

## Replay methods

Replay methods are based on repeatedly exposing the model to the new data and data on which it has been already trained on. New data is combined with sampled old data, and can be used for rehearsal (thus retaining training data of old sub-tasks) or as constraint generators. If the retained samples are used for rehearsal, they are trained together
with samples of the current sub-task. If not, they are used directly to characterize valid gradients.

The main differences b/w replay methods exists in the following:
- How examples are picked and stored
- How examples are replayed
- How examples update the weights 

**Relevant papers**

- [An Investigation of Replay-based Approaches for Continual Learning](https://arxiv.org/pdf/2108.06758.pdf)
- [Sample Condensation in Online Continual Learning](https://arxiv.org/pdf/2206.11849v1.pdf)
- [Measuring Catastrophic Forgetting in Neural Networks](https://arxiv.org/pdf/1708.02072.pdf)
- [Mitigating Catastrophic Forgetting in Deep Learning in a Streaming Setting Using Historical Summary](https://www.osti.gov/servlets/purl/1885239)

**CVPR**
- [A Closer Look at Rehearsal-Free Continual Learning](https://drive.google.com/file/d/1R0Huefs8i3n0DRepCi73WrYgc9JQzLcN/view)

## Parameter Isolation methods

Parameter isolation methods try to assign certain neurons or network resources to a single sub-task. Dynamic architectures row, e.g., with the number of tasks, so for each new sub-task new neurons are added to the network, which do not interfere with previously learned representations. This is not relevant to us since we do not want to add additional tasks to the network. 

## Regularization methods

Regularization methods work by adding additional terms to the loss function. Parameter regularization methods study the effect of
neural network weight changes on task losses and limit the movement of important ones, so that you do not deviate too much from what you learned previously. 

**Relevant papers**

- [Overcoming catastrophic forgetting in neural networks](https://arxiv.org/pdf/1612.00796.pdf)
- [Riemannian Walk for Incremental Learning: Understanding Forgetting and Intransigence](https://arxiv.org/abs/1801.10112)

**CVPR**
- [Preserving Linear Separability in Continual Learning by Backward Feature Projection](https://georgegu1997.github.io/files/2023_BFP.pdf)

## Knowledge Distillation methods

Originally designed to transfer the learned knowledge of larger network (teacher) to a smaller one (student), knowledge distillation methods have been adapted to reduce activation and feature drift in continual learning. Unlike regularization methods that regularize the weights, KD methods regularize the network intermediate outputs. 

**Relevant papers**

- [PODNet: Pooled Outputs Distillation for Small-Tasks Incremental Learning](https://arxiv.org/abs/2004.13513)

**CVPR**

- [Online Distillation with Continual Learning for Cyclic Domain Shifts](https://drive.google.com/file/d/1ap2EBLk365gfiKgUMwgrQkdNMDAf2N_S/view)

# SequeL

This is based on this [CVPR paper](https://drive.google.com/file/d/1IhMwup04gvsNAL7j-UsfNU4ALDIYFgjJ/view). SequeL is a flexible and extensible library for Continual
Learning that supports both PyTorch and JAX frameworks. SequeL provides a unified interface for a wide range of Continual Learning algorithms, including regularization-
based approaches, replay-based approaches, and hybrid approaches.