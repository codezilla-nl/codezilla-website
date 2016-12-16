# Workers

Service Workers
> Service workers essentially act as proxy servers that sit between web applications, and the browser and network (when available). They are intended to (amongst other things) enable the creation of effective offline experiences, intercepting network requests and taking appropriate action based on whether the network is available and updated assets reside on the server. They will also allow access to push notifications and background sync APIs.
[Bron: MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

Web Workers
> Web Workers provide a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can perform I/O using `XMLHttpRequest` (although the `responseXML` and channel attributes are always null). Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa.) 
[Bron: MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers "Bron")

[The difference between web and service workers](https://aarontgrogg.com/blog/2015/07/20/the-difference-between-service-workers-web-workers-and-websockets/)

## Doel
Bedenk een slimme manier om service en/of web workers in te zetten voor de CODEZILLA website en bouw deze. Denk hierbij aan caching, performance, etc. 

## Inspiratie
* Het meest voordehand liggende voorbeeld is natuurlijk caching. 
    * Service workers:
        * [sw-precache](https://github.com/GoogleChrome/sw-precache)
        * [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)
* Offline browsing (Zonder internet verbinding toch nog Martin's telefoonnummer kunnen vinden :))

## Extra info
* Aangezien service workers (nog) alleen worden ondersteund in Chrome en Firefox, is het uiteraard belangrijk dat de site blijft werken zonder webworkers :)
* Aan de andere kant betekent dit dat je in de web worker files geen rekening hoeft te houden met legacy browsers, en kun je dus losgaan op ES6
* De support voor web workers is daarentegen een stuk breder
