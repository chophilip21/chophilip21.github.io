---
title: Networking part 2 - Session Layer and Transport Layer
date: 2023-04-05 09:58:47 +07:00
modified: 2023-04-06 16:49:47 +07:00
tags: [networking, OSI]
description: Basics of networking II
image: "/openssh_part2/How-port-forwading-works-1.jpg"
usemathjax: true
---

# Table of contents
- [REST API](#rest)
- [Socket Programming](#socket)

In the [previous post](https://chophilip21.github.io/network_part1/), I have covered the basics of Networking, mostly around the top application layers of the OSI model. In this post, I will cover the lower layers of the OSI model: Session, Transport, and Network.  



<figure>
<img src="
https://s7280.pcdn.co/wp-content/uploads/2018/06/osi-model-7-layers-1024x734.jpg" alt="osi">
<figcaption>Review of the OSI model. </figcaption>
</figure>



# 1.0 - REST API <a name="rest"></a>

Before heading over to the lower layers, let's talk about REST API. If you are a programmer, you must be familar with it. But what is it exactly, and where does it belong in terms of networking? REST stands for REpresentational State Transfer. REST is almost like an architectural style, it doesn't care about the building materials per say. It can be used with HTTP, FTP, or any other communication protocol. REST just happens to be very commonly used with HTTP.

If you look at the OSI diagram above, REST is on the fifth layer (session) of OSI model, but many say that REST is an architecture style, not a official layer in a client-server interaction. Isn't this quite confusing?    


<figure>
<iframe src="https://giphy.com/embed/3o6MbbwX2g2GA4MUus" width="480" height="364" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/season-3-the-simpsons-3x5-3o6MbbwX2g2GA4MUus"></a></p>
</figure>

Well this is what I found out. I recommend checking this [article out](https://medium.com/the-sixt-india-blog/rest-stop-calling-your-http-apis-as-restful-apis-e8336e3e799b).




# 2.0 - Socket Programming <a name="socket"></a>

