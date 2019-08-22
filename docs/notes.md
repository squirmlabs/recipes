`a given set of architectural constraints is useful.` 

`All design decisions at the architectural level should be made within the context of the functional, behavioral, and social requirements of the system being designed, which is a principle that applies equally to both software architecture and the traditional field of building architecture.` 

`componentized systems, where the implementation is partitioned into independent components that communicate to perform a desired task.`

`Software research has rarely been able to objectively evaluate the impact of various design choices on system behavior`

`The Web is intended to be an Internet-scale distributed hypermedia system`

`When given a name, a coordinated set of architectural constraints becomes an architectural style.`

`I research to find a framework for understanding software architecture via architectural styles, revealing how styles can be used to guide the architectural design of network-based application software.` 

`componentized systems, where the implementation is partitioned into independent components that communicate to perform a desired task.`

`A good architecture is not created in a vacuum.`

`REST has been used both as a means to define architectural improvements and to identify architectural mismatches`

__has rarely been able to objectively evaluate the impact of various design choices on system behavior__. 

`Networking research, in contrast, is focused on the details of generic communication behavior between systems and improving the performance of particular communication techniques, often ignoring the fact that changing the interaction style of an application can have more impact on performance than the communication protocols used for that interaction.`

Roy Fielding is `motivated by the desire to understand and evaluate the architectural design of network-based application software through principled use of architectural constraints, thereby obtaining the functional, performance, and social properties desired of an architecture.`

`When given a name, a coordinated set of architectural constraints becomes an architectural style.`

`I research to find a framework for understanding software architecture via architectural styles, revealing how styles can be used to guide the architectural design of network-based application software.` 

`Architecting the Web requires an understanding of its requirements`. 

`The Web is intended to be an Internet-scale distributed hypermedia system, which means considerably more than just geographical dispersion. `

`The Internet is about interconnecting information networks across organizational boundaries.` 

`Suppliers of information services must be able to cope with the demands of anarchic scalability and the independent deployment of software components. `

`Distributed hypermedia provides a uniform means of accessing services through the embedding of action controls within the presentation of information retrieved from remote sites.`

`An architecture for the Web must therefore be designed with the context of communicating large-grain data objects across high-latency networks and multiple trust boundaries.`

`Representational State Transfer (REST) architectural style for distributed hypermedia systems.` 

`REST provides a set of architectural constraints that, when applied as a whole, emphasizes scalability of component interactions, generality of interfaces, independent deployment of components, and intermediary components to reduce interaction latency, enforce security, and encapsulate legacy systems.` Roy Fielding describes the `software engineering principles guiding REST and the interaction constraints chosen to retain those principles, contrasting them to the constraints of other architectural styles`.

 `Internet standards for the Hypertext Transfer Protocol (HTTP) and Uniform Resource Identifiers (URI)`

`most real-world systems, not all components of the deployed Web architecture obey every constraint present in its architectural design`. `REST has been used both as a means to define architectural improvements and to identify architectural mismatches`. __Mismatches occur when, due to ignorance or oversight, a software implementation is deployed that violates the architectural constraints__.