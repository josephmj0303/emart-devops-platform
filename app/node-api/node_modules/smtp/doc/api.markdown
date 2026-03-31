node-smtp(3) -- SMTP server (and soon, client) library and daemon for node.js
============================================================================

## Synopsis

An example of an SMTP server written with Node which dumps to the console
any mail sent to it:

    var smtp = require('smtp')

    smtp.createServer(function(connection) {
        connection.on('DATA', function(message) {
           console.log('Message from ' + message.sender)
           message.on('data', function(data) {
              console.log("DATA: " + data)
           })
           message.on('end', function() {
              console.log('EOT')
              message.accept()
           })      
        })
    }).listen(25)

    console.log("SMTP server running on port 25")

## smtp.Server

Ths main SMTP server constructor. Usually instantiated with
`'smtp.createServer'`

### Properties

* `hostname`, the domain name to reply to a `HELO` or `EHLO` command with.
  Defaults to `hostname.unconfigured`.
* `maxSize`, the largest message acceptable. Defaults to `undefined`.
* `allowPipelining`, whether to allow the `ESMTP` `PIPELINING` extension.
  Defaults to `true`.
* `authMethods`, an array of authentication types to allow. Defaults to
  `undefined`.

### Event: 'connection'

`function(connection) { }`

Emitted when each client connects

### smtp.createServer([callback])

The `'callback'` parameter will be passed each new connection

## smtp.Connection

This object is created internally and returned from the `'connection'`
callback.

It is an EventEmitter that implements the `Readable Stream` interface, as
well as the following events:

### Properties

* `helo`, the an object in the form of `{name: "name given at HELO time",
  extended: true}`
* `sender`, the sender information given in the `MAIL FROM:` command.
* `receipients`, the recipients given by `RCPT TO:` commands.
* `state`, the current state of the connection. (Currently just `welcome` or
  `data`)
* `currentMessage`, the EventEmitter that represents the current message
  stream, if the connection is in the `data` state.

### Event: 'HELO' and 'EHLO'

`function(helodata) {}`

Emitted when a client sends the `'HELO'` or `'EHLO'` commands.

The `'helodata'` object has the following properties:

* `'name'`, the argument given to the command
* `'valid'`, whether or not the command will be accepted. Can be set to
  false to reject the helo name. Defaults to `true`.
* `'extended'`, `true` if the client is using ESMTP

You will most likely want to use the same callback for both events:

    var f = function(helodata) {
       if(/invalid/.test(helodata.name)) helodata.valid = false
    }
    connection.on('HELO', f)
    connection.on('EHLO', f)

### Event: 'MAIL FROM'

`function(sender) {}`

Emitted when a sender is specified by the client.

The `'sender'` object has the following properties:

* `'address'`, the SMTP address specified
* `'valid'`, whether the address will be accepted. Can be set to `false` to
  reject a sender. Defaults to `true`.

### Event: 'RCPT TO'

`function(recipient) {}`

Emitted for each recipient the client specifies.

The `'recipient'` object has the following properties:

* `'address'`, the SMTP address specified
* `'valid'`, whether the address will be accepted. Can be set to `false` to
  reject a sender. Defaults to `true`.

### Event: 'DATA'

`function(MessageStream) {}`

Emitted when the client begins sending message data.


### Event: 'RSET'

`function() {}`

Emitted when the client issues a reset command

### Event: 'QUIT'

`function() {}`

Emitted when the client quits, before the socket is closed

### Event: 'EXPN' (work in progress)

Emitted when the client issues an expand aliases command

## smtp.MessageStream()

An `EventEmitter` implementing the `Readable Stream` interface carrying the
message data.

### Properties

* `'sender'`, the SMTP sender object
* `'receivers'`, an array of SMTP receiver objects
* `'connection'`, the `'smtp.Connection'` object
* `'accepted'`, whether or not confirmation that the message has been
  received will be sent. Defaults to `false`.  Call `accept()` to accept the
  message or `reject()` to reject it.

### Event: accept

Emitted when the message is accepted.

### Event: reject

Emitted when the message is rejected.

### smtp.MessageStream.accept()

Accepts the message, so the SMTP daemon will return a 2xx response.

### smtp.MessageStream.reject()

Rejects the message, so the SMTP daemon will return a 4xx/5xx response.
