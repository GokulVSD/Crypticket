<p align="center">
<a href="https://imgur.com/chzyIcQ"><img src="https://i.imgur.com/chzyIcQ.png" title="source: imgur.com" width="40%" /></a></p>
<p align="center">
  
 <h3 align="center"> <br>
  Secure, Trustless, Elegant
  <br> </h3>
 
<h5 align="center">A database-free fully offline-capable cryptographic ticket and password generation and management platform, built as a responsive progressive web app (PWA) using React, utilising ECDSA elliptic curve public key digital signature verification.</h5>

## 

<h4 align="center"><a href="https://gokulvsd.github.io/Crypticket">gokulvsd.github.io/Crypticket</a></h4>

## Incentive
In an age where privacy and trusting entities with sensitive data is of utmost concern, the importance of safely storing, transmitting and using sensitive information gets elevated. What better way is there to handling such a task than keeping the system completely disconnected from any network, and storing all sensitive data encrypted and local, guaranteeing the ownership of the data to the user. Such feats can now be accomplished using modern advancements in cryptography and recent additions to web browser frameworks.

Crypticket was meant to be a proof of concept implementation of the above, which just so happened to be suitable and ready for commercial use.

The problem, which seems trivial at first glance, is a way of securely storing and creating keys, which can be used for a variety of purposes, like verifying tickets or passes for events, transportation, services, ownership verification, or any other use case where the identity of an individual needs to be verified to be unique and non malicious by an owner.

In the process of solving this problem, we found an elegant way to create and store unique and secure passwords (which can be used for literally anything), and so we incorporated the password generator alongside the the core utility as an additional feature.

##

placeholder for gifs (1st level, showing use in both desktop, 2nd level showing use in mobile and UI in desktop)

##

## Thought Process
Let's start off with the example of a ticket management system for an event, such as a convention. We consider an owner (event organiser) and the attendees.

For the trivial case of the verification of the owner, it's simple for the owner to verify him/her self with a unique secret that only they know.

For the case of an owner and a single attendee, the owner tells a secret to the attendee, which the attendee echoes back when entering the hall. It's essential for no one else to be able to figure out this secret. It's also essential for this secret to be verified only once. Another individual with the same secret should not be let in, so as to prevent the single attendee from profiting by selling duplicates.

Now for the good stuff, a single owner and a plethora of attendees. The owner generates as many secrets as required, and gives each attendee a unique secret. The attendees echo back the secret when entering the hall. This creates a whole host of problems due to the fact that we're limiting ourselves in terms of storage in addition to disconnecting ourselves from a network:
1. How do we generate such secrets? How can we guarantee their uniqueness? Since we can be tasked to generate an extraordinary number of these secrets in case of very large events, we've gotta come up with some procedure.
2. How can we be sure that no one else will be able to figure out the procedure we used to generate the secrets and simply generate new ones and sell them for profit?
3. How can we store these secrets for later verification like when the attendees are entering the hall? We have limited storage.
4. How can we prevent duplicate verification? Again, we have limited storage, we can't simply remember each secret that has already been verified, that would take too much space.
5. How do we make this whole process user friendly and elegant? It's not realistic to expect the attendees to stand in a long line to verify their tickets, you can't give them a huge secret that each one of them needs to remember/echo back to the organiser, it needs to be short, and it needs to be verified incredibly fast.

The processes used by Crypticket to overcomes all these difficulties are discussed in the next section.
##

placeholder for gif showing responsivity and state transfer

##

<p align="center">placeholder for the incentive</p>

##

placeholder for images

## Frameworks
 <p> <strong>Reactjs</strong> stateful UI rendering and interaction via hierarchy of components</p>
 <p> <strong>Bootstrap</strong> css framework for modals and dropdowns</p>
 <p> <strong>jQuery</strong> DOM interaction and BootstrapJS animations</p>
 <p> <strong>elliptic</strong> fast elliptic curve cryptography in plain javascript</p>
 <p> <strong>Nodejs</strong> for a few npm modules</p>
 <p> <strong>FontAwesome</strong> open-source svg icons (manually minimised)</p>
 
 <br />
 
 ## APIs
<p><strong>localStorage API</strong> maintaining and transfering state across sessions</p>
<p><strong>cacheStorage API</strong> offline webcaching of files using service workers</p>
<p><strong>Clipboard API</strong> copying strings to clipboard via javascript</p>

 <br />
 
 ## External React Components
<p><strong><a href="https://github.com/wwayne/react-tooltip">ReactTooltip</a></strong> provides customisable tooltips for React components</p>

<br />

## Tools Utilised
 <p> <strong>Browserify</strong> converting Node modules into browser friendly javascript</p>
 <p> <strong>Assets</strong> Photoshop and Premiere</p>
 <p> <strong>Code</strong> VS Code and Sublime 3</p>
 <p> <strong>Debugging</strong> Chromium debug console</p>
 
<br />

## Security
```
placeholder
```
<br />

## Cool facts
placeholder

<br />

## Creators
<p><strong>Gokul Vasudeva</strong>   <a href="https://github.com/gokulvsd">github.com/gokulvsd</a></p>
<p><strong>Anusha A</strong>   <a href="https://github.com/anushab05">github.com/anushab05</a></p>

<br />

##
*The creators give permission to reuse parts of code and components, but publishing a web app with the same or mostly similar source code is prohibited, not to mention, that's a pretty douchy thing to do.*
