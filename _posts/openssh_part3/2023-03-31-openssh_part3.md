---
title: SSH Part3 - Using VPN to safely connect
date: 2023-03-31 11:58:47 +07:00
modified: 2023-03-31 16:49:47 +07:00
tags: [VPN, pi-hole, wireguard, ssh, networking, raspberry pi]
description: Making connections more secure using VPN
image: "/openssh_part2/How-port-forwading-works-1.jpg"
---

Okay, here comes the last post of the SSH series!

<figure>
<iframe src="https://giphy.com/embed/wXnmM6hHFtz3IulO36" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/thebachelorette-abc-the-bachelorette-bacheloretteabc-wXnmM6hHFtz3IulO36"></a></p>
</figure>

# Table of contents
- [Dangers of Port Forwarding Layer](#forwarding)
- [VPN vs SSH](#vpn_vs_ssh)
- [Raspberry Pi as VPN server](#raspberry_pi)
- [Setting up OS on Raspberry Pi](#os)
- [DHCP Reservation and Static Address](#dhcp)
- [Pi Hole and DNS configuration](#pi_hole)
# 1.0 - Dangers of Port Forwarding <a name="forwarding"></a>

In the [previous post](https://chophilip21.github.io/openssh_part2/), I have successfully created a SSH connection to my home Linux Server using port-forwarding and openSSH. But all appproaches have some weaknesses, and there are some vulnerabilities to port-forwarding as well. **Port forwarding inherently gives people outside of your network more access to your computer. Giving access or accessing unsafe ports can be risky, as threat actors and other people with malicious intents can then easily get full control of your device.** Yes the chance that someone might really care to attack my PC in this fashion is very small, and we are already protecting our entrance using SSH keys, but we cannot deny the fact that there is a more secure way -- `VPN`, which we have briefly discussed in the previous post.  

## 1.1 - VPN vs SSH  <a name="vpn_vs_ssh"></a>

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


# 2.0 - Raspberry Pi as VPN server <a name="raspberry_pi"></a>

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

# 2.1 - Setting up OS on Raspberry Pi <a name="os"></a>

I have referred to this [Github repo](https://github.com/notasausage/pi-hole-unbound-wireguard) for a lot of the contents. 

Setting up Raspberry PI OS is of course the first thing that needs to be done. Get a Micro SD card that is at least 16 GB or larger, and install OS from the official [installer here](https://www.raspbian.org/). If you would like to download any other OS, that is possible too, but my Raspberri Pi only has 2GB of RAM thus I did not want to install OS that may have higher RAM consumption. Just ensure you can connect your keyboard and monitor to Raspberry during installation, so that you can set up your user account initially. 

<figure>
<img src="
https://github.com/notasausage/pi-hole-unbound-wireguard/raw/master/screenshots/raspberry-pi-imager.png" alt="vpn/ssh">
<figcaption>Setting up Raspberry Pi should be dead easy. </figcaption>
</figure>

Once that is set up, make sure you can SSH into Raspberry PI by changing

```bash
$ sudo raspi-config
```

interfacing options > SSH > Yes

Now you should be able to SSH into Raspberry Pi simply with

```bash
$ ssh {userid}@{raspberry_pi_private_ip}
```

Similar to any other IP dynamic addresses, the private IP on Raspberry PI will continue to change, thus **it will make your life easier by assigning static IP to Raspberry PI in the in the router**. Assign a static IP based on the subnet schema, save changes, and restart the router. 

Okay so Raspberry PI is all set, so there is no more need to connect it to keyboard or monitor directly. Everything could be done via SSH terminal in the main Desktop.

## DHCP reservation and static address<a name="DHCP"></a>

But before moving on to the next step, we need to set a **static IP for our Raspberry Pi and the main desktop**. This is because we will no longer be port-forwarding from public IPv4 address once the VPN is configured, and you would definitely need a static IP address for proper access. 

When you run bash command:

```bash
$ ifconfig
```

You will see stuff like below. 

```bash
inet 192.xxx.x.xx  netmask 255.255.255.0  broadcast 192.xxx.x.xxx
inet6 xx80::xx2e:xxx:fe45:764b  prefixlen 64  scopeid 0x20<link>
inet6 xxxx:xxx:7b5e:6e00:xxxx:xxxx:xxxx:6cbc  prefixlen 64  scopeid 0x0<global>
inet6 xxxx1:xxx:7b5e:6e00:xxxx:xxxx:xxxx:764b  prefixlen 64  scopeid 0x0<global>
ether b4:xx:xx:xx:xx:xx txqueuelen 1000  (Ethernet)
```

From the router settings, you can choose to directly declare static IP for your device. Or, you can do `Dynamic Host Configuration Protocol(DHCP) Reservation`, in which your router provides a long list of reserved IP table, and you choose one that you would like to assign it to your device. You must know the `Media Access Control (MAC)` address of the device, which does not periodically change like IP address, as MAC address is a hardware identifier (you can force changes though). In my cases, MAC address was simply the one next to (Ethernet), which is `b4:xx:xx:xx:xx:xx`.

There is no difference functionality wise, but because you are choosing from a list, you can ensure that you are not duplicating any IP assignment. So here, I went with DHCP reservation to get static IP. You need static IPs set up for PI hole set up.


## Pi Hole and DNS configuration <a name="pi_hole"></a>

For the next few sections, I would recommend my blog post [here](https://chophilip21.github.io/network_part1/) to understand the basic concepts, especially those related to DNS. It's extra confusing to follow along if you don't understand the reasons behind each actions. Assuming you read it, let's talk about what PI hole achieves. 


<figure>
<img src="https://cdn.mos.cms.futurecdn.net/dbxpzhEmaZewKX7YEaexeY.png
" alt="vpn/ssh">
<figcaption>Pi hole allows you to block ads everywhere </figcaption>
</figure>

Pi-Hole is an advert-blocking application aimed at blocking ads at the network level. It acts as a Domain Name Service (DNS) server and, as such, queries all domains trying to access the devices connected to the network and blocks all ad-serving ones. You also block the unnecessary network requests for those ads and thus reduce bandwidth usage. **Pi-hole pairs nicely with a VPN (Virtual Private Network) so that you can connect remotely and still take advantage of ad-blocking from anywhere outside your network**. So we install Pi-hole just inside our Raspberry Pi, and we can protect the entire network, and monitor the statistics via the dashboard. 

The installation instructions change time to time, so it's best to check out the [official page](https://github.com/pi-hole/pi-hole/#one-step-automated-install). Installation should be easy. 

<figure>
<img src="./upstream_provider.png" alt="vpn/ssh">
<figcaption>You can set upstream provider to anything for now.</figcaption>
</figure>


Once download is complete, change your default password to something else:

```bash
$ pihole -a -p
```

you should be able to boot up web interface anytime via:

```bash
$ http://{static_ip}/admin
$ http://pi.hole/admin  #or 
```

After logging into Pi-hole, we need to set **Pi-hole as DNS Server**.