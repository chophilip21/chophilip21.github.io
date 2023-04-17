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
- [REST (protocol vs architecture)](#rest)
- [What is RPC?](#rpc)
- [What is gRPC?](#grpc)
- [Websockets (protocol, not architecture](#rest_vs_socket)
- [Socket Programming](#socket)
- [Transport Layer](#transport)

In the [previous post](https://chophilip21.github.io/network_part1/), I have covered the basics of Networking, mostly around the top application layers of the OSI model. In this post, I will cover the lower layers of the OSI model: Session, Transport, and Network.  

<figure>
<img src="
https://lh3.googleusercontent.com/Mn5UKGeWOhDRwTr16RCTN6MDfy1_u3bhzWJxa-jYgJd_xRvalV5IdKreSXWsI9ia_4Td89HApvz2XTsKWkyOstGbrJbcjOoJ3n6uHErwHQyRbOlraPiIa_BTDm-pTeQTD6UiGkty" alt="osi">
<figcaption>Review of the OSI model. </figcaption>
</figure>

# 1.0 - REST (protocol vs architecture) <a name="rest"></a>

Before heading over to the lower layers, very important distrinction is to understand architecture vs protocols. **A communication protocol is a system of rules (contract) that allows two or more entities of a communications system to transmit information via any kind of variation of a physical quantity. An architecture is how to best organize these protocols to create an efficient application.** Now let's talk about REST API.  REST stands for <i>REpresentational State Transfer </i>. I wanted to discuss it here, as it is not mentioned in the book at all. Well of course, there is a reason for that. It's because <u>REST in an architecture style (concept, not a contract), so it does not belong to OSI model. You can say it's layer 8 talking to layer 7. In application development, the only protocol that really belongs to the OSI application layer is HTTP protocols </u>.  But, you can picture everything like this:

- REST (Architecture, layer 8.)
- HTTP (protocol. Layer 7.)
- SOAP (protocol that relies on others. Layer 7.5)
- Websocket (protocol that relies on others. Layer 7.5)
- gRPC (protocol that relies on others. Layer 7.5)

Above isn't something that everyone would agree, but it makes things easier to understand in the context of OSI models. REST on the imaginary layer 8 doesn't care about the building materials per say, so it can be used with HTTP, FTP, or any other communication protocol. REST just happens to be very commonly used with HTTP. If you see a statements like [gRPC is 7 times faster than REST](https://blog.dreamfactory.com/grpc-vs-rest-how-does-grpc-compare-with-traditional-rest-apis/#:~:text=%E2%80%9CgRPC%20is%20roughly%207%20times,data%20for%20this%20specific%20payload.), this isn't the most accurate statement because REST is just a general style. 

<figure>
<img src="
https://restapilinks.com/wp-content/uploads/2021/03/ekawmj3rafdtn06hzj79.png
" alt="osi">
<figcaption>Conceptually, REST does not belong to OSI model. But could be seen as layer 8.</figcaption>
</figure>


To review some of the main conceptual ideas of REST:

- REST is architectural style, and HTTP is protocol. It imposes conditions on how an API should work. 
- REST API needs to ensure:
    - `Statelessness`: Every requests are treated independently, so if same request is made, it should return same request all the time. The state of client does not matter.
    - `Cacheable`: API must implement some caching algorithm to enhance performance
    - `Decoupled`: Client and server applications in REST design must always be independent of each other. That's why we have front-end and back-end.
    - `Layered`: REST style allows you to use layered system where you deploy API on server A, store data on server B, and authenticate in server C. 
- Standard RESTful API HTTP methods include POST, PUT, PATCH, GET, DELETE.
- Client sends requests typically in JSON format, which gets interpreted as HTTP requests by server. Server returns HTTP response, and API returns the HTTP response back in common formats like JSON/XML/HTML. 

## 1.1 - RPC <a name="rpc"></a>

The term [gRPC](https://grpc.io/docs/languages/python/basics/) comes in many locations in system design. It's a protocol developed by Google in 2016, but it's based on pre-existing concept of `Remote Procedure Call (RPC)`. The history of RPC is very old.

<figure>
<img src="
https://devathon.com/blog/wp-content/uploads/sites/2/2019/09/New-Project-3.jpg
" alt="osi">
<figcaption>The idea of RPC goes back to 1980s, even before REST.</figcaption>
</figure>

RPC (remote Procedure call Protocol) is a remoting protocol that requests services from a remote computer program over a network without needing to know the underlying network technology. RPC is socket-based (will be discussed later), that is, working at the session level The RPC protocol assumes that some transport protocols exist, such as TCP or UDP, to carry information data between communication programs. So in terms of OSI model, you can say that RPC spans the transport and application tiers.

<figure>
<img src="
https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Schaubilder/EN-rpc.png" alt="osi">
<figcaption>In the simplest terms, RPCs enable you to connect to a network.</figcaption>
</figure>


The message structure of RPC requests are extremely simple, making it ideal microservcies exchanging many messages with each other. Client's request paramters are encoded from client stub, passed to server's stub to be decoded, and back and forth to exchange information. **Once a call is made in RPC, the calling environment is suspended while the process is handed over to the server and then executed. Once that procedure is finished, the results are shipped back to the client**. This is the query-response loop. RPC, therefore, excels in applications where control alternates between both parties. Execution in these implementations occurs synchronously.These custom contracts make RPC ideal for IoT applications — especially low-powered ones — where REST might otherwise struggle due to resource consumption. Conversely, REST truly excels in hypermedia-dependent scenarios, and scales extremely well. It can group many different resources together and serve them in the appropriate format to users.


## 1.2 - gRPC <a name="grpc"></a>

Now we have some idea about RPC, let's check what gRPC is. gRPC uses HTTP/2 protocols as transport protocol (TCP connection in the lower level), so it can be seen as layer 7.5 in the OSI model. Posts like [this](https://www.altexsoft.com/blog/what-is-grpc/) characterizes gRPC as architecture style like REST, but it's more of a protocol whether than a style. 

<figure>
<img src="https://grpc.io/img/grpc-core-stack.svg" alt="osi">
<figcaption>gRPC is easily programmable using wrapper languages like Java, C++, Python and Go.</figcaption>
</figure>

gRPC leverages the simple, lightweight communication principle of RPC, and instead of JSON, gRPC messages are serialized using Protobuf, an efficient binary message format. Protobuf serializes very quickly on the server and client. Protobuf serialization results in small message payloads, important in limited bandwidth scenarios like mobile apps.

| Feature                 | gRPC                               |    HTTP    |
| :---------------------- | :--------------------------------- | :-------------------: |
| `Protocol`                | HTTP/2                           | HTTP |
| `Payload`                 | Protobuf                         |      JSON     |
| `Browser Support`         | No                               |      Yes     |

Parsing with Protocol Buffers is less CPU-intensive because data is represented in a binary format which minimizes the size of encoded messages. This means that message exchange happens faster, even in devices with a slower CPU like IoT or mobile devices. However, it's support for browsers are quite limited in many ways, and thus RESTful HTTP protocols are still being used in many areas despite the speed advantage of gRPC.  


## 1.3 - Websockets (protocol, not architecture) <a name="rest_vs_socket"></a>

Unlike REST or RPC, websocket isn't an API type. It's a communication protocol in the application layer, just like HTTP protocols. Below is an important picture to keep in mind:

Yes, initially, then they switch to the webSocket protocol. All webSocket connections start with an HTTP request with a header that requests an upgrade to the webSocket protocol. If the receiving server agrees, then the two sides switch protocols from HTTP to webSocket and from then on the connection uses the webSocket protocol.

<figure>
<img src="
https://www.baeldung.com/wp-content/uploads/2019/04/OCI-Model.jpg" alt="osi">
<figcaption>Both HTTP and Websocket belongs to the top layer</figcaption>
</figure>

HTTPs and Websockets are the communication protocols that have a defined set of rules with which communication works. The major difference is the data transmission mode. **An HTTP starts sending data as responses only when a request is received, whereas Websockets send and receives data based on data availability**. This is why for cases like chat-apps, which requires bi-directional real time communication, websockets are preferred over http based communication. 

1. It makes no sense to compare REST and Websockets, as that is not comparing apples to apples. It should vs HTTP vs Websockets.
2. Huge difference, websockets are over persistent TCP cooniction, whereas HTTP/2.0 requests are not necessarily persistent. But they are both over TCP connection.
3. **Websockets and Sockets are completely different concepts.**


# 2.0 - Socket programming (protocol, not architecture) <a name="socket"></a>

Okay, now we have cleared all our confusion regarding REST, Websockets, and GRPC protocols. 

Before reading the book, I thought sockets and websockets refer to the same thing, as the names are quite similar. But they are completely different things. WebSockets is communication channel, typically run from browsers connecting to Application Server over a protocol similar to HTTP that runs over TCP/IP, which is why it's called **websocket**. However, **Socket is an endpoint for sending and receiving data across the network (like Port number), belonging to OSI model layer 5**. 

```bash
#example of socket (protocol, local address, local port, remote address, remote port)
(TCP, 8.8.8.4, 8080, 8.8.8.8, 8070)
```

Okay now we know where everything belongs in the OSI model, let's return to the book. If a process is a house, process's socket is analogous to a door. We have already done SSH/VPN set up multiple times, so this should be easy to understand. To summarize: 

1. We send messages to sockets, which sends data to down the transport layer (both UDP and TCP available).
2. The unique identifier of each socket is the **port number**. 
3. When packets are generated, each packet will contain destination IP and port number, as well as source IP and port number. 
 
<figure>
<img src="
https://qph.cf2.quoracdn.net/main-qimg-08868215079c2d3cd56fc659ddbdf9e5" alt="osi">
<figcaption>TCP example of socket programming</figcaption>
</figure>


Honestly there isn't anything that's too difficult to understand here. Let's move on to transport layer. 

# 3.0 - Transport layer <a name="transport"></a>

I have already covered the basics of transport layer in the previous post, but now let's go into deeper details, check how transport layer works with the network layer.

https://nordicapis.com/whats-the-difference-between-rpc-and-rest/