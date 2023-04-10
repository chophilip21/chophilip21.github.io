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
- [REST (Representational State Transfer) API](#rest)
- [Websockets vs HTTP (Do not compare to REST)](#rest_vs_socket)
- [Socket Programming](#socket)
- [UDP Socket Python Programmin](#socket_udp)

In the [previous post](https://chophilip21.github.io/network_part1/), I have covered the basics of Networking, mostly around the top application layers of the OSI model. In this post, I will cover the lower layers of the OSI model: Session, Transport, and Network.  

<figure>
<img src="
https://lh3.googleusercontent.com/Mn5UKGeWOhDRwTr16RCTN6MDfy1_u3bhzWJxa-jYgJd_xRvalV5IdKreSXWsI9ia_4Td89HApvz2XTsKWkyOstGbrJbcjOoJ3n6uHErwHQyRbOlraPiIa_BTDm-pTeQTD6UiGkty" alt="osi">
<figcaption>Review of the OSI model. </figcaption>
</figure>

# 1.0 - REST (Representational State Transfer) API <a name="rest"></a>

Before heading over to the lower layers, let's talk about REST API. I wanted to discuss it here, because surprisingly the textbook does not discuss much about REST APIs, probably because it doesn't really fit in the OSI model itself. However, it's good to review the concepts and see where it belongs in the entire picture. 

If you are a programmer, you must be familar with it to some extent, but what is it exactly, and where does it belong in terms of networking? REST stands for <i>REpresentational State Transfer </i>. **REST is an architectural style that allows Application Programming Interface (API) to properly communicate b/w computers and computer programs**. It doesn't care about the building materials per say, so it can be used with HTTP, FTP, or any other communication protocol. REST just happens to be very commonly used with HTTP. So to organize some main ideas:

- REST is architectural style, and HTTP is protocol. It imposes conditions on how an API should work. 
- REST API needs to ensure:
    - `Statelessness`: Every requests are treated independently, so if same request is made, it should return same request all the time. The state of client does not matter.
    - `Cacheable`: API must implement some caching algorithm to enhance performance
    - `Decoupled`: Client and server applications in REST design must always be independent of each other. That's why we have front-end and back-end.
    - `Layered`: REST style allows you to use layered system where you deploy API on server A, store data on server B, and authenticate in server C. 
- Standard RESTful API HTTP methods include POST, PUT, PATCH, GET, DELETE.
- Client sends requests typically in JSON format, which gets interpreted as HTTP requests by server. Server returns HTTP response, and API returns the HTTP response back in common formats like JSON/XML/HTML. 

<figure>
<img src="
https://restapilinks.com/wp-content/uploads/2021/03/ekawmj3rafdtn06hzj79.png
" alt="osi">
<figcaption>Conceptually, REST must belong to the top layer 7.</figcaption>
</figure>


## 1.1 - Websockets vs HTTP (Do not compare to REST) <a name="rest_vs_socket"></a>

The reason why I discuss REST API first is because the book dives straight into socket programming without much explanation of REST and Websockets in the application layer that is vital for software developers. Below is an important picture to keep in mind:

<figure>
<img src="
https://www.baeldung.com/wp-content/uploads/2019/04/OCI-Model.jpg" alt="osi">
<figcaption>Both HTTP and Websocket belongs to the top layer</figcaption>
</figure>

HTTPs and Websockets are the communication protocols that have a defined set of rules with which communication works. The major difference is the data transmission mode. **An HTTP starts sending data as responses only when a request is received, whereas Websockets send and receives data based on data availability**. This is why for cases like chat-apps, which requires bi-directional real time communication, websockets are preferred over http based communication. 

1. It makes no sense to compare REST and Websockets, as that is not comparing apples to apples. It should vs HTTP vs Websockets.
2. Huge difference, websockets are over persistent TCP cooniction, whereas HTTP/2.0 requests are not necessarily persistent. But they are both over TCP connection.
3. **Websockets and Sockets are completely different concepts.**


# 2.0 - Socket programming <a name="socket"></a>

Before reading the book, I thought sockets and websockets refer to the same thing, as the names are quite similar. But they are completely different things. WebSockets is communication channel, typically run from browsers connecting to Application Server over a protocol similar to HTTP that runs over TCP/IP, which is why it's called **websocket**. However, **Socket is an endpoint for sending and receiving data across the network (like Port number), belonging to OSI model layer 5**. 

```bash
#example of socket (protocol, local address, local port, remote address, remote port)
(TCP, 8.8.8.4, 8080, 8.8.8.8, 8070)
```

Okay now we know where everything belongs in the OSI model, let's return to the book. If a process is a house, process's socket is analogous to a door. We have already done SSH/VPN set up multiple times, so this should be easy to understand. To summarize: 

1. We send messages to sockets, which sends data to down the transport layer (both UDP and TCP available).
2. The unique identifier of each socket is the **port number**. 
3. When packets are generated, each packet will contain destination IP and port number, as well as source IP and port number. 
 
## 2.1 - UDP Socket Python Programming <a name="socket_udp"></a>

Now we know the basic of socket programming, let's write some codes in Python, starting with UDP sockets. 