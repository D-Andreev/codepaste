/**
 * Web socket
 * @constructor
 */
function Ws () {
    this.socket = null;
}

/**
 * Init
 */
Ws.prototype.init = function() {
    if (this.socket) return;
    this.socket = new WebSocket("ws://localhost:3000/echo", "protocolOne");
};

/**
 * Destroy
 */
Ws.prototype.destroy = function() {
    this.socket = null;
};

/**
 * Send
 * @param message
 */
Ws.prototype.send = function(message) {
    this.socket.send(message);
};

module.exports = Ws;
