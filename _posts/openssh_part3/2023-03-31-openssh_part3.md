---
title: SSH Part3 - Using VPN to safely connect
date: 2023-03-31 11:58:47 +07:00
modified: 2023-03-31 16:49:47 +07:00
tags: [VPN, openssh, ssh, networking, raspberry pi]
description: Making connections more secure using VPN
image: "/openssh_part2/How-port-forwading-works-1.jpg"
---

# 1.0 - Dangers of Port Forwarding

In the [previous post](https://chophilip21.github.io/openssh_part2/), I have successfully created a SSH connection to my home Linux Server using port-forwarding and openSSH. And as    I have talked about it in the past, all appproaches have some weaknesses, and there are some vulnerabilities to port-forwarding as well. **Port forwarding inherently gives people outside of your network more access to your computer. Giving access or accessing unsafe ports can be risky, as threat actors and other people with malicious intents can then easily get full control of your device.**. Yes the chance that someone might really care to attack my PC in this fashion is very scarce, and we are protecting our entrance using SSH keys, but we cannot deny the fact that there is more secure way -- `VPN`, which we have briefly discussed in the previous post.  

# 1.1 - VPN vs SSH

First of all, what is VPN (Virtual Private Network) exactly, and how is it different from SSH (Secure Shell)? For more details, refer to this [article](https://surfshark.com/blog/ssh-vs-vpn#:~:text=VPNs%20and%20SSH%20systems%20both,and%20protects%20all%20your%20data.). VPNs and SSH systems both create secure “tunnels” for your data to travel through. These tunnels ensure that nobody other than the intended recipient can view or alter your data. 

# 1.2 - Raspberry Pi 