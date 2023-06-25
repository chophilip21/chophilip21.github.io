---
layout: post
title: Image Sorting and Composition Assessment Part 1 - Continuous Learning
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

IQA is definitely one of the areas where Machine Learning algorithms can excel at. However, there are many criterias (defined above) that it must fulfill, and the biggest hurdle is that because every photographers have different preferences, you cannot expect one pretrained model to satisfy all the end users. We must implement `Continual Learning (CL)` process, so that we do not have to retrain entire pipeline of models from scratch. When the end user performs his own version of the culling process based on the suggestions of the pretrained model, this should become the new stream of data for CL training. The original IQA model should be tuned according to this new data, with the aim to minimize training time and the catastrophic forgetting, where the model forgets what it learned before the CL process began.     

Now, we need to think about the architecture of this entire pipeline. First, it may be difficult to combine IQA and near-duplicate detevction (NDD) models together. Intuitively, a NDD model should break down the images into N set of images, and within each set, IQA will determine the quality of images. And there must be CL algorithm on top of everything. Ideally, NDD and IQA both should be continuously trainable, if not, at least the IQA portion of the pipeline should be trainable.  

Another thing to consider is `EXIF data`. EXIF (Exchangeable Image File Format) files store important data about photographs. Almost all digital cameras create these data files each time you snap a new picture. An EXIF file holds all the information about the image itself — such as the exposure level, where you took the photo, and any settings you used. Apart from the photo itself, EXIF data could have important details for NDD and IQA. We must see if there is any improvement in the result when we incorporate the EXIF data. It could be totally unnecessary, just making network heavy. But it could prove to be useful as well. 

Now, in terms of the representation of the architecture, something like below could make sense:

<figure>
<img src="https://miro.medium.com/v2/resize:fit:640/format:webp/1*HSd_CLq1VB9PepYF_hoshw.png" alt="osi">
<figcaption> Possible ideas for IQA and NDD portion of the architecture. Referenced from https://utorontomist.medium.com/photoml-photo-culling-with-machine-learning-908743e9d0cb. </figcaption>
</figure>

NDD and IQA, I do already have some idea as to how they would work even before doing proper research, but the idea of continuous learning is very vague to me. How are these supposed to be implemented? Does it work on any architecture? What are the limitations? 

I feel like it would only make sense for me to look into IQA and NDD closely after having better grasp of CL. Therefore, for the first part of the post, I will checkout Continous Learning. 


# Continuous learning (CL)

Incrementally learning new information from a non-stationary stream of data, referred to as `continual learning`, is a key feature of natural intelligence, but a challenging problem for deep neural networks. [Refer to this paper](https://www.nature.com/articles/s42256-022-00568-3):


<figure>
<img src="assets/img/2023-06-25/scenarios.png" alt="osi">
<figcaption> In CL, there are three possible scenarios. For more info, refer to </figcaption>
</figure>

Here, we are not increasing the number classes, and we are not changing the tasks that model is supposed to perform. We are only interested in the **Domain Incremdental learning**. The structure of the problem is always the same, but the context or input-distribution changes. 


