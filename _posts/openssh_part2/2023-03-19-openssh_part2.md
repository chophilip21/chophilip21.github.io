---
title: SSH Part2 - Configuring SSH Server with OpenVPN
date: 2023-03-19 11:58:47 +07:00
modified: 2023-03-19 16:49:47 +07:00
tags: [OpenVPN, openssh, ssh]
description: Improve productivity using SSH Server
image: "/openssh_part2/How-port-forwading-works-1.jpg"
---

# 1.0 - SSH Connection Error. WHY?

In the [first part of the post](https://chophilip21.github.io/openssh), I went over the very basic of setting up SSH server. Unfortunately when you are outside of your home network, the SSH connection will fail.
SSH access commands that worked at home when you were testing, may suddently return `connection refused` or `connection timeout`, despite credentials remaining the same, and the server/port still remaining open. <b>Why is this even happening?</b>

## 1.1 - Port forwarding

This is quite obvious when you understand the idea of IP connection, as we did in the previous post. Devices in the same network can communicate with each other via private IP addresses. Private IPs are like neighbors living in the same building. If you need to talk to your neighbor, you can just walk up and knock on the door.

<figure>
<img src="https://media.geeksforgeeks.org/wp-content/uploads/20220517111808/privateip1.jpg" alt="openssh">
<figcaption>Internal devices communicate with private IP </figcaption>
</figure>

Remote traffic, however, aren't neighbors. They can be seen as a deliveryman coming from outside. Deliveryman has your address but cannot enter the building as he is does not have the lobby fob. He simply throws the parcel on the ground, and the parcel is just lost. This is similar to what is happening. I am trying to connect to my PC over internet, via `private IP` which cannot be directly accessed by external traffic. 

You can choose to connect via `public IP`, which is like concierage in the building, but without telling where to deliver the parcel exactly, the parcel will not be delivered.  

<figure>
<img src="https://www.stjamescourthotel.co.uk/images/Homepage_807x640/Head-Concierge%2C-Binoy-Nair-807-640f278.jpg?width=807&height=640&ext=.jpg" alt="openssh">
<figcaption>Internal devices communicate with private IP </figcaption>
</figure>

So you need to set some rules for your concierage. This is called `port forwarding`. This essentially makes the public address that can be obtained via below command-- 

```bash
$ wget -qO- ifconfig.co 
$ curl https://ipinfo.io/ip
```

To directly forward the traffic to specific port. This is also referred to as `SSH tunneling`. By the length of the IP address, you should be able to tell if you are looking at IPv4 or IPv6. 

<figure>
<img src="https://www.tommycoolman.com/wp-content/uploads/2021/08/ssh-tunneling-01-1024x203.jpg" alt="openssh">
<figcaption>Port forwarding instructions</figcaption>
</figure>



## 1.2 - Using VPN

Unlike File Transfer Protocol (FTP), which only enables you to upload, delete, and edit files on your server, SSH can accomplish a wide range of tasks, and therefore has much higher risks. 

<figure>
<img src="/openssh_part2/How-port-forwading-works-1.jpg" alt="openssh">
<figcaption>To do port forwarding, firewall needs to be configured, making the security weaker.</figcaption>
</figure>

Under normal circumstances, your network is configured to restrict the ability to access most of these ports from the outside internet. Exposing certain ports to the internet means exposing your network to hacking and all the nasty surprises that come along with it. Port Forwarding does its job, but you can't deny the fact that it has greater risks.

And there is alternative, which is setting up `VPN`. It allows your **computer outside the network to behave as if it was inside the network**. Yes, this sets up additional layer of work, but this establihes additional layer of security and now you can **connect directly via private ip address without having to expose any ports on your router to internet**. 

To make this work, we will use [OpenVPN](https://openvpn.net/). 

# OpenVPN

OpenVPN allows you to quickly and easily connect private networks, devices, and servers to build a secure, virtualized modern network. It also provides free tier, which is more than sufficient in my case. 

