/*jslint white:false plusplus:false nomen:false */
/*globals exports, console, require */

var DEBUG = true;
var INIT_MESSAGES = 5;

var messages = [];

Array.prototype.inject = function(element) {

    if (this.length >= INIT_MESSAGES) {
        this.shift();
    }
    this.push(element);
};

// "start" will launch the chatserver and simply broadcast whatever comes in to all clients
// returning the io socket on which it listens
exports.start = function(app)
{
    var io = require('socket.io').listen(app);

    // heroku does not yet support websockets, so advices the following according to:
    // https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
    io.configure(function () {
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 10);
    });


    io.sockets.on('connection', function(client) {

        if (DEBUG)
        {
            console.log("New Connection: ", client.id);
        }

        client.emit("init", JSON.stringify(messages));

        client.on('msg', function(msg) {

            if (DEBUG)
            {
                console.log("Message: " + msg);
            }

            var message = JSON.parse(msg);
            messages.inject(message);

            client.broadcast.emit('msg', msg);
        });

        client.on('disconnect', function() {

            if (DEBUG)
            {
                console.log("Disconnected: ", client.id);
            }
        });
    });
    return io;
};
