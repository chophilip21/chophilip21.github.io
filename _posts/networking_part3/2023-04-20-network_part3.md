---
title: Networking part 3 - Network layers and below
date: 2023-04-20 09:20:15 +07:00
modified: 2023-04-20 20:49:47 +07:00
tags: [networking, OSI]
description: Basics of networking III
usemathjax: true
---

# Table of contents
- [Layer 3: Network layer](#network)

In the [previous post](https://chophilip21.github.io/network_part2/), I have reviewed layers under application layer, like the transport layer. I will cover the remaining layers in this post. 

<figure>
<img src="
https://www.researchgate.net/publication/224631234/figure/fig1/AS:669093657063425@1536535767015/ILLUSTRATION-OF-THE-SEVEN-LAYER-OSI-MODEL.ppm" alt="osi">
<figcaption>Final review of the OSI model</figcaption>
</figure>

# 1.0 - Network Layer:  <a name="network"></a>

While working with VPN and SSH projects, I have already studied a lot of basic ideas related to networking, but network layers are arguably the most complex layer in the protocol stack according to the author, thus 
it is good idea to study throughly. 

The idea of network layers are straight forward. It receives the datagrams from router, extracts transport-layer segments, delivers the data back up. 

<figure>
<img src="./ControlPlanePunting.png" alt="osi">
<figcaption>Network layer can be decomposed into dataplane and control plane</figcaption>
</figure>
