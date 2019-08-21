# Rest

I constantly get asked "What makes a REST API 'REST'?". There was a time where I didn't have the answer.

A RESTful system is a lot more than interacting with a system using HTTP, to send JSON back and forth.

Why is it so easy to interconnect a nonhomogeneous set of systems using REST?

Here comes the URI Scheme. REST is protocol independent, so if you want to use other protocols alternatively over HTTP, just ask one question. Is the protocol capable of supporting a URI scheme?

## The Main Idea

> __Performance__ : The communication style proposed by REST is meant to be efficient
  and simple, allowing a performance boost on systems that adopt it.

> __Scalability of component interaction__ : Any distributed system should be able to
handle this aspect well enough, and the simple interaction proposed by REST greatly
allows for this.

> __Simplicity of interface__ : A simple interface allows for simpler interactions between
systems, which in turn can grant benefits like the ones previously mentioned.

> __Modifiability of components__ : The distributed nature of the system, and the separation
of concerns proposed by REST, allows for components to be
modified independently of each other at a minimum cost and risk.

> __Portability__ : REST is technology and language agnostic, meaning that it can be
implemented and consumed by any type of technology. There are some constraints, but no specific technology is enforced.

> __Reliability__ : The stateless constraint proposed by REST allows for
the easier recovery of a system after failure.

> __Visibility__ : Again, the stateless constraint proposed has the added benefit of
improving visibility, because any monitoring system doesn’t need to look further
than a single request message to determine the full state of said request.

From this list, some direct benefits can be extrapolated:

- A component-centric design allows you to make systems that are very fault tolerant.
Having the failure of one component not affect the entire stability of the system is a
great benefit for any system.

- Interconnecting components is quite easy, minimizing the risks when adding new
features or scaling up or down.

- A system designed with REST in mind will be accessible to a wider audience, thanks
to its portability. With a generic interface, the system can be used by a wider range of developers.

In order to achieve these properties and benefits, a set of constraints were added to REST to help define a uniform connector interface.

## Constraints

According to Roy Fielding, there are two ways to define a system. 

1. Start from a blank slate, an empty whiteboard, with no initial knowledge of the system being built or the use of familiar components until the needs are satisfied. 
2. Start with the full set of needs for the system, and constraints are added to individual components until the forces that influence the system are able to interact in harmony with each other.

REST follows the second approach. In order to define a REST architecture, a null-state is initially defined--a system that has no constraints whatsoever and where component differentiation is nothing but a myth--and constraints are added one by one.

### Client-Server

The first constraint to be added is one of the most common ones on network-based architectures: 
> client - server 

__A server is in charge of handling a set of services, and it listens for requests regarding said services__. __The requests, in turn, are made via a connector by a client system needing one of those services (see Figure 1-1 )__.

[                                              ]

_Figure 1-1. Client-Server architecture diagram_

The main principle behind this constraint is the separation of concerns . It allows for the separation of front-end code (representation and possible UI-related processing of the information) from the server side code, which should take care of storage and server-side processing of the data.

> This constraint allows for the independent evolution of both components, offering a great deal of flexibility by letting client applications improve without affecting the server code and vice-versa.

### Stateless

The constraint to be added on top of the previous one is the stateless constraint (see Figure 1-2 ).

[                                              ]

_Figure 1-2. Representation of the stateless constraint_

> Communication between client and server must be stateless, meaning that each request done from the client must have all the information required for the server to understand it, without taking advantage of any stored data.

This constraint represents several improvements for the underlying architecture:

> Visibility : Monitoring the system becomes easy when all the information required is
inside the request.

> Scalability : By not having to store data between requests, the server can free
resources faster.

> Reliability : As mentioned earlier, a system that is stateless can recover from a failure
much easier than one that isn’t, since the only thing to recover is the application itself.

> Easier implementation : Writing code that doesn’t have to manage stored state data
across multiple servers is much easier to do, thus the full server-side system becomes
simpler.

Although at first glance this constraint might seem nothing but good, as what normally happens,
there is a trade-off. On one hand, benefits are gained by the system, but on the other side, network traffic could potentially be harmed by adding a minor overhead on every request from sending repeated state information. Depending on the type of system being implemented, and the amount of repeated information, this might not be an acceptable trade-off.

### Cacheable

The cacheable constraint is added to the current set of constraints (see Figure 1-3 ). It proposes that every response to a request must be explicitly or implicitly set as cacheable (when applicable).

[                                              ]

_Figure 1-3. Representation of a client-stateless-cache-server architecture_

> By caching the responses, there are some obvious benefits that get added to the architecture: on the server side, some interactions (a database request, for example) are completely bypassed while the content is cached. On the client side, an apparent improvement of performance is perceived.

The trade-off with this constraint is the possibility of cached data being stale, due to poor caching rules.

This constraint is, again, dependent on the type of system being implemented.

> Figure 1 -3 shows the cache as an external layer between the clients and the servers. This is only one possible implementation of it. The cache layer could be living inside the client (i.e., browser cache) or inside the servers themselves.

### Uniform Interface

One of REST’s main characteristics and winning points when compared to other alternatives is the uniform interface constraint.

> By keeping a uniform interface between components, you simplify the job of the client when it comes to interacting with your system (see Figure 1-4 ). Another major winning point here is that the client’s implementation is independent of yours, so by defining a standard and uniform interface for all of your services, you effectively simplified the implementation of independent clients by giving them a clear set of rules to follow.

[                              ]

_Figure 1-4. Different client types can interact seamlessly with servers thanks to the uniform interface_

Said rules are not part of the REST style, but there are constraints that can be used to create such rules for each individual case.

> This benefit doesn’t come without a price, though; as with many other constraints, there is a
trade-off here: having a standardized and uniform interface for all interactions with your system might harm performance when a more optimized form of communication exists. Particularly, the REST style is designed to be optimized for the Web, so the more you move away from that, the more inefficient the interface can be.

> HATEOAS: In order to achieve the uniform interface, a new set of constraints must be added to the interface: identification of resources, manipulation of resources through representation, self-descriptive messages, and hypermedia as the engine of application state. 

### Layered System

> REST was designed with the Internet in mind, which means that an architecture that follows REST is expected to work properly with the massive amount of traffic that exists in the web of webs.

In order to achieve this, the concept of layers is introduced (see Figure 1-5 ). 

> By separating components into layers, and allowing each layer to only use the one below and to communicate its output to the one above, you simplify the system’s overall complexity and keep component coupling in check. 

This is a great benefit in all type of systems, especially when the complexity of such a system is ever-growing (e.g., systems with massive amounts of clients, systems that are currently evolving, etc.).

[                          ]

_Figure 1-5. Example of a multilayered architecture_

> The main disadvantage of this constraint is that for small systems, it might add unwanted latency into the overall data flow, due to the different interactions between layers.

### Code-on-Demand

Code-on-demand is the only optional constraint imposed by REST, which means that an architect using REST can choose whether or not to use this constraint, and either gains its advantages or suffers its disadvantages.

> With this constraint, the client can download and execute code provided by the server (such as Java applets, JavaScript scripts, etc.).

> In the case of REST APIs, this constraint seems unnecessary, because the normal thing for an API client to do is just get information from an endpoint, and then process it however needed; but for other uses of REST, like web servers, a client (i.e., a browser) will probably benefit from this constraint (see Figure 1-6 ).

[                          ]

_Figure 1-6. How some clients might execute the code-on-demand, whereas others might not_

All of these constraints provide a set of virtual walls within which an architecture can move and still gain the benefits of the REST design style.

But let’s take a step back. I initially defined REST as a design style for representational state transfer; in other words, you transfer the state of things by using some kind of representation. But what are these “ things ”? The main focus of a REST architecture is the resources, the owners of the state that you’re transferring.

Just like in a real state (almost), it’s all about resources, resources, resources.

## Resources

The main building blocks of a REST architecture are the resources . Anything that can be named can be a resource (a web page, an image, a person, a weather service report, etc.). Resources define what the services are going to be about, the type of information that is going to be transferred, and their related actions. The resource is the main entity from which everything else is born.

A resource is the abstraction of anything that can be conceptualized (from an image file, to a  plain text document). The structure of a resource is shown in Table 1-1 .

_Table 1-1. Resource Structure Description_


|        Property | Description                                                                                                          |
| --------------: | :------------------------------------------------------------------------------------------------------------------- |
| Representations | It can be any way of representing data(binary, JSON, XML, etc.). A single resource can have multiple representations |
|      Identifier | A URL that retrieves only one specific resource at any given time.                                                   |
|        Metadata | Content-type, last-modified time, and so forth.                                                                      |
|    Control Data | Is-modifiable-since, cache-control.                                                                                  |

### Representations

At its core, a representation is a set of bytes, and some metadata that describes these bytes.

> A single resource can have more than one representation; just think of a weather service report (which could act as a possible resource).

A report for a single day could potentially return the following information:
- The date the report is referencing
- The maximum temperature for the day
- The minimum temperature for the day
- The temperature unit to be used
- A humidity percentage
- A code indicating how cloudy the day will be (e.g., high, medium, low)

```json
{
  "date": "2014-10-25",
  "max_temp": 25.5,
  "min_temp": 10.0,
  "humidity_percentage": 75.0,
  "cloud_coverage": "low"
}
```
