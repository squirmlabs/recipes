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

```xml
<?xml version='1.0' encoding='UTF-8' ?>
<root>
  <temp_unit value="C" />
  <humidity_percentage value="75.0" />
  <cloud_coverage value="low" />
  <date value="2014-10-25" />
  <min_temp value="10.0" />
  <max_temp value="25.5" />
</root>
```

```pipe
2014-10-25|25.5|10.0|C|75.0|low
```

And there could be many more. They all successfully represent the resource correctly; __it is up to the client to read and parse the information__

_For the resource above the following functions might exist with the client to transform dates, temperatures, percentages, string to color_

Even when the resource has more than one representation, it is common for clients (due to implicity of development) to only request one of them. 

Unless you’re doing some sort of consistency check against the API, there is no point in requesting more than one representation of the same resource, is there? 

There are two very popular ways to let the client request a specific representation on a resource that has more than one.

1.The first one directly follows the principles described by REST (when using HTTP as a basis), called _content negotiation_, which is part of the HTTP standard (JSON).
2.The second one is a simplified version of this, with limited benefits. For the sake of completeness, I’ll quickly go over them both.

### Content Negotiation

As mentioned, this methodology is part of the HTTP standard, `5` so it’s the preferred way according to REST (at least when focused on API development on top of HTTP). It is also more flexible and provides further advantages than the other method.

5 See http://tools.ietf.org/html/rfc7231#section-5.3 .

It consists of the client sending a specific header with the information of the different content types (or types of representations) supported, with an optional indicator of how much supported/preferred that format is. Let’s look at an example from the “Content Negotiation” page on Wikipedia:

```http header

Accept: text/html; q=1.0, text/*; q=0.8, image/gif; q=0.6, image/jpeg; q=0.6, image/*;
q=0.5, */*; q=0.1

```

This example is from a browser configured to accept various types of resources, but preferring HTML over plain text, and GIF or JPEG images over other types, but ultimately accepts any other content type as a last resort.

On the server side, the API is in charge of reading this header and finding the best representation for each resource, based on the client’s preferences.

### Using File Extensions

Even though this approach is not part of the REST proposed style, it is widely used and a fairly simple alternative to the somewhat more complex other option, so I’ll cover it anyway.

During the last few years, using file extensions has become an alternative preferred over using content negotiation; it is a simpler version and it doesn’t rely on a header being sent, but instead, it works with the concept of file extensions.

The extension portion of the file’s name indicates the content type to the operating system and any other software trying to use it; so in the following case, the extension added to the resource’s URL (unique identifier) indicates to the server the type of representation wanted.

```http

GET /api/v1/books .json
GET /api/v1/books .xml

```

> Both identifiers reference the same resource—the list of books, but they request a different
representation of it.

> Note This approach might seem easier to implement, and even understand, by humans, but it lacks the flexibility added by content negotiation, and should only be used if there is no real need for complex cases where multiple content types might be specified with their related preference.


### Resource Identifier - URI

The resource identifier should provide a unique way of identification at any given moment and it should provide the full path to the resource. _A classic mistake is to assume it’s the resource’s ID on the storage medium used (i.e., the ID on the database)_.

This means that you cannot consider a simple numeric ID as a resource identifier; you must provide the full path, and because we’re basing REST on HTTP, the way to access the resource is to provide its full URI ( unique resource identifier ).

```https://tools.ietf.org/html/rfc7231#section-5.3
5.3.  Content Negotiation

   The following request header fields are sent by a user agent to
   engage in proactive negotiation of the response content, as defined
   in Section 3.4.1.  The preferences sent in these fields apply to any
   content in the response, including representations of the target
   resource, representations of error or processing status, and
   potentially even the miscellaneous text strings that might appear
   within the protocol.

   +-------------------+---------------+
   | Header Field Name | Defined in... |
   +-------------------+---------------+
   | Accept            | Section 5.3.2 |
   | Accept-Charset    | Section 5.3.3 |
   | Accept-Encoding   | Section 5.3.4 |
   | Accept-Language   | Section 5.3.5 |
   +-------------------+---------------+

5.3.1.  Quality Values

   Many of the request header fields for proactive negotiation use a
   common parameter, named "q" (case-insensitive), to assign a relative
   "weight" to the preference for that associated kind of content.  This
   weight is referred to as a "quality value" (or "qvalue") because the
   same parameter name is often used within server configurations to
   assign a weight to the relative quality of the various
   representations that can be selected for a resource.

   Fielding & Reschke           Standards Track                   [Page 37]

 
RFC 7231             HTTP/1.1 Semantics and Content            June 2014


   The weight is normalized to a real number in the range 0 through 1,
   where 0.001 is the least preferred and 1 is the most preferred; a
   value of 0 means "not acceptable".  If no "q" parameter is present,
   the default weight is 1.

     weight = OWS ";" OWS "q=" qvalue
     qvalue = ( "0" [ "." 0*3DIGIT ] )
            / ( "1" [ "." 0*3("0") ] )

   A sender of qvalue MUST NOT generate more than three digits after the
   decimal point.  User configuration of these values ought to be
   limited in the same fashion.

5.3.2.  Accept

   The "Accept" header field can be used by user agents to specify
   response media types that are acceptable.  Accept header fields can
   be used to indicate that the request is specifically limited to a
   small set of desired types, as in the case of a request for an
   in-line image.

     Accept = #( media-range [ accept-params ] )

     media-range    = ( "*/*"
                      / ( type "/" "*" )
                      / ( type "/" subtype )
                      ) *( OWS ";" OWS parameter )
     accept-params  = weight *( accept-ext )
     accept-ext = OWS ";" OWS token [ "=" ( token / quoted-string ) ]

   The asterisk "*" character is used to group media types into ranges,
   with "*/*" indicating all media types and "type/*" indicating all
   subtypes of that type.  The media-range can include media type
   parameters that are applicable to that range.

   Each media-range might be followed by zero or more applicable media
   type parameters (e.g., charset), an optional "q" parameter for
   indicating a relative weight (Section 5.3.1), and then zero or more
   extension parameters.  The "q" parameter is necessary if any
   extensions (accept-ext) are present, since it acts as a separator
   between the two parameter sets.

      Note: Use of the "q" parameter name to separate media type
      parameters from Accept extension parameters is due to historical
      practice.  Although this prevents any media type parameter named
      "q" from being used with a media range, such an event is believed
      to be unlikely given the lack of any "q" parameters in the IANA




Fielding & Reschke           Standards Track                   [Page 38]

 
RFC 7231             HTTP/1.1 Semantics and Content            June 2014


      media type registry and the rare usage of any media type
      parameters in Accept.  Future media types are discouraged from
      registering any parameter named "q".

   The example

     Accept: audio/*; q=0.2, audio/basic

   is interpreted as "I prefer audio/basic, but send me any audio type
   if it is the best available after an 80% markdown in quality".

   A request without any Accept header field implies that the user agent
   will accept any media type in response.  If the header field is
   present in a request and none of the available representations for
   the response have a media type that is listed as acceptable, the
   origin server can either honor the header field by sending a 406 (Not
   Acceptable) response or disregard the header field by treating the
   response as if it is not subject to content negotiation.

   A more elaborate example is

     Accept: text/plain; q=0.5, text/html,
             text/x-dvi; q=0.8, text/x-c

   Verbally, this would be interpreted as "text/html and text/x-c are
   the equally preferred media types, but if they do not exist, then
   send the text/x-dvi representation, and if that does not exist, send
   the text/plain representation".

   Media ranges can be overridden by more specific media ranges or
   specific media types.  If more than one media range applies to a
   given type, the most specific reference has precedence.  For example,

     Accept: text/*, text/plain, text/plain;format=flowed, */*

   have the following precedence:

   1.  text/plain;format=flowed

   2.  text/plain

   3.  text/*

   4.  */*

   The media type quality factor associated with a given type is
   determined by finding the media range with the highest precedence
   that matches the type.  For example,



Fielding & Reschke           Standards Track                   [Page 39]

 
RFC 7231             HTTP/1.1 Semantics and Content            June 2014


     Accept: text/*;q=0.3, text/html;q=0.7, text/html;level=1,
             text/html;level=2;q=0.4, */*;q=0.5

   would cause the following values to be associated:

   +-------------------+---------------+
   | Media Type        | Quality Value |
   +-------------------+---------------+
   | text/html;level=1 | 1             |
   | text/html         | 0.7           |
   | text/plain        | 0.3           |
   | image/jpeg        | 0.5           |
   | text/html;level=2 | 0.4           |
   | text/html;level=3 | 0.7           |
   +-------------------+---------------+

   Note: A user agent might be provided with a default set of quality
   values for certain media ranges.  However, unless the user agent is a
   closed system that cannot interact with other rendering agents, this
   default set ought to be configurable by the user.

5.3.3.  Accept-Charset

   The "Accept-Charset" header field can be sent by a user agent to
   indicate what charsets are acceptable in textual response content.
   This field allows user agents capable of understanding more
   comprehensive or special-purpose charsets to signal that capability
   to an origin server that is capable of representing information in
   those charsets.

     Accept-Charset = 1#( ( charset / "*" ) [ weight ] )

   Charset names are defined in Section 3.1.1.2.  A user agent MAY
   associate a quality value with each charset to indicate the user's
   relative preference for that charset, as defined in Section 5.3.1.
   An example is

     Accept-Charset: iso-8859-5, unicode-1-1;q=0.8

   The special value "*", if present in the Accept-Charset field,
   matches every charset that is not mentioned elsewhere in the
   Accept-Charset field.  If no "*" is present in an Accept-Charset
   field, then any charsets not explicitly mentioned in the field are
   considered "not acceptable" to the client.

   A request without any Accept-Charset header field implies that the
   user agent will accept any charset in response.  Most general-purpose
   user agents do not send Accept-Charset, unless specifically



Fielding & Reschke           Standards Track                   [Page 40]

 
RFC 7231             HTTP/1.1 Semantics and Content            June 2014


   configured to do so, because a detailed list of supported charsets
   makes it easier for a server to identify an individual by virtue of
   the user agent's request characteristics (Section 9.7).

   If an Accept-Charset header field is present in a request and none of
   the available representations for the response has a charset that is
   listed as acceptable, the origin server can either honor the header
   field, by sending a 406 (Not Acceptable) response, or disregard the
   header field by treating the resource as if it is not subject to
   content negotiation.

5.3.4.  Accept-Encoding

   The "Accept-Encoding" header field can be used by user agents to
   indicate what response content-codings (Section 3.1.2.1) are
   acceptable in the response.  An "identity" token is used as a synonym
   for "no encoding" in order to communicate when no encoding is
   preferred.

     Accept-Encoding  = #( codings [ weight ] )
     codings          = content-coding / "identity" / "*"

   Each codings value MAY be given an associated quality value
   representing the preference for that encoding, as defined in
   Section 5.3.1.  The asterisk "*" symbol in an Accept-Encoding field
   matches any available content-coding not explicitly listed in the
   header field.

   For example,

     Accept-Encoding: compress, gzip
     Accept-Encoding:
     Accept-Encoding: *
     Accept-Encoding: compress;q=0.5, gzip;q=1.0
     Accept-Encoding: gzip;q=1.0, identity; q=0.5, *;q=0

   A request without an Accept-Encoding header field implies that the
   user agent has no preferences regarding content-codings.  Although
   this allows the server to use any content-coding in a response, it
   does not imply that the user agent will be able to correctly process
   all encodings.

   A server tests whether a content-coding for a given representation is
   acceptable using these rules:

   1.  If no Accept-Encoding field is in the request, any content-coding
       is considered acceptable by the user agent.




Fielding & Reschke           Standards Track                   [Page 41]

 
RFC 7231             HTTP/1.1 Semantics and Content            June 2014


   2.  If the representation has no content-coding, then it is
       acceptable by default unless specifically excluded by the
       Accept-Encoding field stating either "identity;q=0" or "*;q=0"
       without a more specific entry for "identity".

   3.  If the representation's content-coding is one of the
       content-codings listed in the Accept-Encoding field, then it is
       acceptable unless it is accompanied by a qvalue of 0.  (As
       defined in Section 5.3.1, a qvalue of 0 means "not acceptable".)

   4.  If multiple content-codings are acceptable, then the acceptable
       content-coding with the highest non-zero qvalue is preferred.

   An Accept-Encoding header field with a combined field-value that is
   empty implies that the user agent does not want any content-coding in
   response.  If an Accept-Encoding header field is present in a request
   and none of the available representations for the response have a
   content-coding that is listed as acceptable, the origin server SHOULD
   send a response without any content-coding.

      Note: Most HTTP/1.0 applications do not recognize or obey qvalues
      associated with content-codings.  This means that qvalues might
      not work and are not permitted with x-gzip or x-compress.

5.3.5.  Accept-Language

   The "Accept-Language" header field can be used by user agents to
   indicate the set of natural languages that are preferred in the
   response.  Language tags are defined in Section 3.1.3.1.

     Accept-Language = 1#( language-range [ weight ] )
     language-range  =
               <language-range, see [RFC4647], Section 2.1>

   Each language-range can be given an associated quality value
   representing an estimate of the user's preference for the languages
   specified by that range, as defined in Section 5.3.1.  For example,

     Accept-Language: da, en-gb;q=0.8, en;q=0.7

   would mean: "I prefer Danish, but will accept British English and
   other types of English".

   A request without any Accept-Language header field implies that the
   user agent will accept any language in response.  If the header field
   is present in a request and none of the available representations for
   the response have a matching language tag, the origin server can
   either disregard the header field by treating the response as if it

```

There is one more aspect to consider: the identifier of each resource must be able to reference it unequivocally at any given moment in time. This is an important distinction, because a URI like the following might reference Harry Potter and the Half Blood Prince for a certain period of time, and then Harry Potter and the Deathly Hollows one year later.:





