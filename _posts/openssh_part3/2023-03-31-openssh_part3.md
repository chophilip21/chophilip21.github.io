---
title: SSH Part3 - Using VPN to safely connect
date: 2023-03-31 11:58:47 +07:00
modified: 2023-03-31 16:49:47 +07:00
tags: [VPN, openssh, ssh, networking, raspberry pi]
description: Making connections more secure using VPN
image: "/openssh_part2/How-port-forwading-works-1.jpg"
---

# 1.0 - Dangers of Port Forwarding

In the [previous post](https://chophilip21.github.io/openssh_part2/), I have successfully created a SSH connection to my home Linux Server using port-forwarding and openSSH. But all appproaches have some weaknesses, and there are some vulnerabilities to port-forwarding as well. **Port forwarding inherently gives people outside of your network more access to your computer. Giving access or accessing unsafe ports can be risky, as threat actors and other people with malicious intents can then easily get full control of your device.**. Yes the chance that someone might really care to attack my PC in this fashion is very small, and we are already protecting our entrance using SSH keys, but we cannot deny the fact that there is a more secure way -- `VPN`, which we have briefly discussed in the previous post.  

## 1.1 - VPN vs SSH

First of all, what is VPN (Virtual Private Network) exactly, and how is it different from SSH (Secure Shell)? You need to understand that one does not replace the other, as they have different used cases.

VPNs and SSH systems both create secure “tunnels” for your data to travel through. These tunnels ensure that nobody other than the intended recipient can view or alter your data. 

<figure>
<img src="
https://www.ritavpn.com/blog/wp-content/uploads/2019/12/VPN-vs.-SSH-Tunnel-Which-Is-More-Secure.jpg" alt="vpn/ssh">
<figcaption>VPN does not replace SSH. Visa Versa </figcaption>
</figure>


`SSH (Secure shell)` protocol allows client to securely communicate/control the remote server from anywhere, by setting up direct client to server tunnel through the routers, which encrpyts signals passing through the channel. This is securely done by only allowing those who have authenticated to create SSH tunnels to the server. Unlike `Windows Remote Desktop Protocol (RDP)`, there is no graphical user interface (GUI), but for coding purposes, you do not need anything more than the terminal. 

`VPN (Virtual Private Network)` on the other hand, allows you to safely connect to the internet, by creating a tunnel within a network level that makes alterations to every data packets which are being sent by encrypting them and encapsulating them into a new network protocol. This is especially useful when you are connected to unsecured public network, which is usually the case when I am studying at a public library or a cafe. It would allow you to disguise your whereabouts, access certain regional content (location spoofing), and also allow access to certain protected contents that can only be approached within a specified network. 

**Obviously VPN alone won't give you remote control over a network, but SSH and VPN in comination assures a deeper level of security.**  Meaning, even if the VPN is compromised, then an attacker/prober would still need to penetrate the SSH connection to get anything of value.


# 2.0 - Raspberry Pi as VPN server

I intend to set up VPN server so that:

1. Make sure I am safe under network eavesdropping when using unsecured public wifi (important even if I am not using SSH features)
2. Allow SSH access to my Home Linux Machine directly via private IpV4 connection instead of Public IPv4 + Port Forwarding. Stop exposing myself to the internet. (This will require setting static IP though, so my ISP does not keep on changing IP address assigned to my Linux Machine)
3. **Secure the SSH connections by configuring SSH rules to only open up connections to home ip address**. No one would be able to SSH into my PC without first being able to connect to my VPN sever. Makes everything extra secure.   

Okay, so the intention here is to **create a self-hosted VPN server that runs 24/7, which would disguise all my traffic to internet as my home network**. I can't really use my home PC as VPN server, as it uses too much 
electricity. Luckily, I have a Raspberry PI that is a perfect fit, which only uses about [5 watts per hour](https://www.pidramble.com/wiki/benchmarks/power-consumption), which is less than 1/10 of a typical laptop:

<figure>
<img src="
https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Raspberry_Pi_4_Model_B_-_Side.jpg/640px-Raspberry_Pi_4_Model_B_-_Side.jpg" alt="vpn/ssh">
<figcaption>Raspberry PI 4 Model B</figcaption>
</figure>

I initially purchased Raspberry PI during my graduate studies at SFU as a Summer project, but I never had a chance to make a good use out of it when I started my CO-OP term, followed by getting a full-time position offering at the end of the contract. Eventually I lost the motivation to do anything with it, but I figured now is a good time to do something useful at last.   

# 2.1 - Setting up OS on Raspberry Pi 

