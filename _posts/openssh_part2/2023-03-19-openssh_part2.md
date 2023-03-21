---
title: SSH Part2 - Configuring SSH Server to be accessible remotely
date: 2023-03-19 11:58:47 +07:00
modified: 2023-03-19 16:49:47 +07:00
tags: [Ngrok, openssh, ssh]
description: Improve productivity using SSH Server
image: "/openssh_part2/How-port-forwading-works-1.jpg"
---

# 1.0 - SSH Connection Error. WHY?

In the [first part of the post](https://chophilip21.github.io/openssh), I have presented what I learned about the basics of SSH server. Unfortunately when you are outside of your home network, the SSH connection will fail.
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
<img src="https://www.tommycoolman.com/wp-content/uploads/2021/08/ssh-tunneling-01-1024x203.jpg" alt="port forwarding">
<figcaption>Port forwarding instructions. Port 3389 needs to be opened up.</figcaption>
</figure>

In order to do the port-forwarding, the remote port `3389` first needs to be open to the public over the firewall, via commands like below:

```bash
$ sudo ufw allow 3389/tcp
```


## 1.2 - Using VPN

There are multiple ways to tackle the SSH problems, and each methods have its own pros and cons. And one of the obvious risks for port-forwarding, is `security` aspect. Unlike File Transfer Protocol (FTP), which only enables you to upload, delete, and edit files on your server, SSH can accomplish a wide range of tasks, and therefore has much higher risks. 

<figure>
<img src="/openssh_part2/How-port-forwading-works-1.jpg" alt="openssh">
<figcaption>To do port forwarding, firewall needs to be configured, making the security weaker.</figcaption>
</figure>

Under normal circumstances, your network is configured to restrict the ability to access most of these ports from the outside internet. Exposing certain ports to the internet means exposing your network to hacking and all the nasty surprises that come along with it. Port Forwarding does its job, but you can't deny the fact that it has greater risks.

And there is alternative, which is setting up `VPN`. It allows your **computer outside the network to behave as if it was inside the network**. This sets up additional layer of work, but this establihes additional layer of security and now you can **connect directly via private ip address without having to expose any ports on your router to internet**. You can use tools like [openvpn](https://openvpn.net/) to setup a VPN server, but cons of this approach would be increased complexity in the entire process. I figured that this is a overkill for the tasks that I am trying to acheive.  


## 1.3 - Ngrok

There is got to be a more straight-forward approach. After some research, I came across `Ngork`. Ngrok exposes local servers behind Network Address Translation (NAT) and firewalls to the public over secure tunnels. Ngrok Secure Tunnels allow you to instantly open access to remote systems without touching any of your network settings or opening any ports on your router. This means you get a secure, reliable tunnel for your developer box, IoT device, or just about anything that has access to the internet.


<figure>
<img src="https://uploads-ssl.webflow.com/63ed707844acb1ccf1ccb700/63eebf554563f71204a1fa66_architecture.png" alt="ngrok">
<figcaption>Ngrok is popular option for application building as well</figcaption>
</figure>

Ngrok does not require VPN or port-forwarding. Ngrok Secure Tunnels work by using a locally installed ngrok agent to establish a connection to the ngrok service. Once the connection is established, you get a public endpoint that you or others can use to access your local service.


# Configuring Ngrok

Okay now let's dive into Ngrok configuration. 