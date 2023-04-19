---
title: Networking part 2 - Lower Layers (What about API?)
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
- [What are Websockets?](#rest_vs_socket)
- [Layer 6: Presentation layer](#presentation)
- [Layer 5: Socket programming (Session layer)](#socket)
- [Layer 4: Transport Layer)](#transport)
- [Layer 4: Multiplexing and Demultiplexing](#plexing)
- [Layer 4: Closer look at UDP](#udp)
- [Layer 4: Closer look at TCP](#tcp)


In the [previous post](https://chophilip21.github.io/network_part1/), I have covered the basics of Networking, mostly around the top application layers of the OSI model. In this post, I will cover the lower layers of the OSI model. But before diving, don't forget that OSI models are in both directions:

<figure>
<img src="
https://www.researchgate.net/publication/224631234/figure/fig1/AS:669093657063425@1536535767015/ILLUSTRATION-OF-THE-SEVEN-LAYER-OSI-MODEL.ppm" alt="osi">
<figcaption>OSI models can be interpreted in both directions, depending on who you are (sender vs receiver) </figcaption>
</figure>

# 1.0 - REST (protocol vs architecture) <a name="rest"></a>

After reading the texbook for couple hours, I realized that the textbook does not mention some of the common software engineering terms like REST, SOAP, Websocket, GraphQL, and etc. And obviously this isn't because the author is reckless, but it's because architectural style or frameworks don't technically belong in the definition of OSI model. OSI model explains concepts related to computer systems communicating over network. **A communication protocol is a system of rules (contract) that allows two or more entities of a communications system to transmit information via any kind of variation of a physical quantity. An architecture is how to best organize these protocols to create an efficient application.** REST (REpresentational State Transfer) is an architecture style (concept, not a contract), so it does not technically belong to OSI model according to the author. You can say it's imaginary layer 8 talking to layer 7. In application development, the only protocol that really belongs to the OSI application layer is HTTP protocol. But, you can picture everything like this:

- REST (Architecture, say layer 8.)
- HTTP (protocol. Layer 7.)
- SOAP (protocol that relies on others. Something like Layer 7.5)
- Websocket (protocol that relies on others. Something like Layer 7.5)
- gRPC (protocol that relies on others. Something like Layer 7.5)

Above isn't something that everyone would agree, but above is what makes sense to be the most. REST on the imaginary layer 8 doesn't care about the building materials per say, so it can be used with HTTP, FTP, or any other communication protocol. REST just happens to be very commonly used with HTTP. If you see a statements like [gRPC is 7 times faster than REST](https://blog.dreamfactory.com/grpc-vs-rest-how-does-grpc-compare-with-traditional-rest-apis/#:~:text=%E2%80%9CgRPC%20is%20roughly%207%20times,data%20for%20this%20specific%20payload.), this isn't the most accurate statement because REST is just a general style. 

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

<i>I will elaborate and create REST based applications on other blog posts, but not here. </i>

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

As you can see, gRPC extends HTTP/2 protocols. A major difference is the use of protobuf (protocol buffers). Parsing with Protocol Buffers is less CPU-intensive because data is represented in a binary format which minimizes the size of encoded messages. This means that message exchange happens faster, even in devices with a slower CPU like IoT or mobile devices. However, it's support for browsers are quite limited in many ways, and thus RESTful HTTP protocols are still being used in many areas despite the speed advantage of gRPC.  


## 1.3 - Websockets <a name="rest_vs_socket"></a>

Similar to gRPC, websocket can be seen as part of the application layer, extending HTTP protocols. WebSockets is communication channel, typically run from browsers connecting to Application Server over a protocol similar to HTTP that runs over TCP/IP, which is why it's called **websocket**. Below is an important picture to keep in mind:

<figure>
<img src="
https://www.vaadata.com/blog/wp-content/uploads/2020/07/Schema-websockets-1.jpg" alt="osi">
<figcaption>Websocket communicates over persistent TCP connection</figcaption>
</figure>

1. All webSocket connections start with an HTTP request with a header that requests an upgrade to the webSocket protocol. If the receiving server agrees, then the two sides switch protocols from HTTP to webSocket and from then on the connection uses the webSocket protocol
2. **An HTTP starts sending data as responses only when a request is received, whereas Websockets send and receives data based on data availability**. This is why for cases like chat-apps, which requires bi-directional real time communication, websockets are preferred over http based communication. 
2. websockets are over persistent TCP CONNECTION, whereas HTTP/2.0 requests are not necessarily persistent. But they are both over TCP connection.
3. It makes no sense to compare REST and Websockets, as that is not comparing apples to apples.
4. **Websockets and Sockets are completely different concepts.**


# 2.0 - Layer 6: Presentation layer <a name="presentation"></a>

Okay, now we have cleared all our confusion regarding REST, Websockets, and GRPC protocols, let's look at the lower layers. Layer 6 is presentation layer. This is a layer that the textbook does not even bother explaining (as the author regards this layer as part of application layer), but it's good to know that it exists. This is a layer that translates the data for the application layer. 

<figure>
<img src="
https://assets.website-files.com/5ff66329429d880392f6cba2/63cfb3d78ead0dcfdc5845c3_The%20presentation%20layer.png
" alt="presentation layer">
<figcaption>Translation/Encrpytion and Compression are the main features of presentation layer</figcaption>
</figure>

Serialization of complex data structures into flat byte-strings (using mechanisms such as TLV or XML) can be thought of as the key functionality of the presentation layer. Encryption is typically done at this level too, although it can be done on the application, session, transport, or network layers, each having its own advantages and disadvantages. 
And of course, the communication flows up and down, so decryption is also handled at the presentation layer as well. Finally, presentation layer is also responsible for data compresion and decompression. 



# 3.0 - Layer 5: Socket programming (Session layer) <a name="socket"></a>

Layer 5 is the session layer. Session Layer is the first one where pretty much all practical matters related to the addressing, packaging and delivery of data are left behind—they are functions of layers four and below. It is the lowest of the three upper layers, which collectively are concerned mainly with software application issues and not with the details of network and internet implementation. The name of this layer tells you much about what it is designed to do: to allow devices to establish and manage sessions. In general terms, a session is a persistent logical linking of two software application processes, to allow them to exchange data over a prolonged period of time. In some discussions, these sessions are called dialogs; they are roughly analogous to a telephone call made between two people.

With in the layer 5, the book focuses the most on **sockets, which is an endpoint for sending and receiving data across the network (like Port number), belonging to OSI model layer 5**. 

```bash
#example of socket (protocol, local address, local port, remote address, remote port)
(TCP, 8.8.8.4, 8080, 8.8.8.8, 8070)
```

If a process is a house, process's socket is analogous to a door. To summarize: 

1. We send messages to sockets, which sends data to down the transport layer (both UDP and TCP available).
2. The unique identifier of each socket is the **port number**. 
3. When packets are generated, each packet will contain destination IP and port number, as well as source IP and port number. 
 

<figure>
<img src="
https://qph.cf2.quoracdn.net/main-qimg-08868215079c2d3cd56fc659ddbdf9e5" alt="osi">
<figcaption>TCP example of socket programming</figcaption>
</figure>


# 4.0 - Transport layer <a name="transport"></a>

In the application layer, messages are generated with the HTTP protocols, hits the sockets in the session layer, waiting to be carried over the network over two transport layer protocol options --- TCP/IP and UDP/IP. This is where messages are chopped into smaller segments (TCP or UDP segments), packaged as IP packets, and delivered down through the pipeline. Apart from above, there are actually several other important procedures running behind the scenes to ensure the best outcome.   

<figure>
<img src="
https://www.baeldung.com/wp-content/uploads/sites/4/2021/07/1.jpg" alt="transport layer">
<figcaption>There are many services running in the transport layer </figcaption>
</figure>


## 3.1 - Layer 4: Multiplexing and Demultiplexing <a name="plexing"></a>

An important function of transport layer, is not only to deliver a message, but it also needs to correctly deliver the message to the process requesting the message. Each process running in the application can have multiple sockets, doors used to exchange data. `Multiplexing` is the process running on the sender side, which aggregates data from each socket, and encapsulating with transport headers, passing to the network layer.   


<figure>
<img src="
https://www.cs.csustan.edu/~john/Classes/Previous_Semesters/CS3000_Communication_Networks/2018_02_Spring/Notes/CNAI_Figures/figure-11.1.jpeg" alt="muxing">
<figcaption>Multiplexing (server) and Demultiplexing (client) are opposites </figcaption>
</figure>

The client side operation equivalent to this is `demultiplexing`, reading the data, and sending the data to correct application layer processes waiting for the data. Each TCP/UDP segment has source port number field, and destination port number field (well known port numbers are restricted for safety), so that Multiplexing and Demultiplexing are done properly. 

<figure>
<img src="
./tcp_segment.png" alt="muxing">
<figcaption>Multiplexing (server) and Demultiplexing (client) are opposites </figcaption>
</figure>

Generally speaking, application developers do not have to worry about these, but it's great to know about theoretical aspects of it. 

## 3.1 - Layer 4: Closer look at UDP <a name="udp"></a>

We already know that when using UDP, there is no additional procedures like doing handshakes (**This is why it's called connectionless**), so the application almost directly talks with IP. Network layer encapsulates information from UDP to datagram, and using the destination port information, it will try it's best to deliver the messages to the correct location. Unlike TCP, there is no congestion control or retry mechanism to counter dataloss. But instead, UDP just blasts away at full speed to minimize any delay in retrival of data. This is why DNS service use UDP whether than UDP, the very first thing that runs when loading browser, because the speed matters the most. 

There is minimum overhead for UDP segment structure. There are only four fields, each consisting two bytes:

- Source/dest port number
- length
- Checksum

<figure>
<img src="
./udp_segment.png" alt="segment">
<figcaption>UDP has only 8 bytes of overhead, whereas TCP segment has 20 bytes of header overhead.</figcaption>
</figure>

Both TCP and UDP operate on **IP (network layer protocol), which is unreliable channel**. This is because IP protocol does not provide any functionality for error recovering for datagrams that are either duplicated, lost or arrive to the remote host in another order than they are send. This is why we take security measures in the upper layers. 

UDP does have `checksum` to determine whether bites within UDP segment have been altered (e.g accidental noise inserted when passing network/router). But the problem is, although UDP does provide error checking mechanism, **it does not do anything to recover from an error**. Damaged segment is usually just ignored, or passed with a warning. 

## 3.2 - Layer 4: Closer look at TCP <a name="tcp"></a>

We looked at UDP, so of course we need to take a look at TCP as well. Recall TCP has these features: 

**1. full-duplex service**: If there is a TCP connection between Process A on one host and Process B on another host, then application-layer data can flow from Process A to Process B at the same time as application-layer data flows from Process B to Process A.

**2. point to point**: transfer is always between one sender and one receiver. one sender cannot send data to multiple receiver at once. There needs to be multiple connections in that case. 

**3. Three way handshake**: 