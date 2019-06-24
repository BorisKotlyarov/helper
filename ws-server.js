const WebSocketServer = new require('ws');
const Actions = require('./ws/actions');


class WsServer {

    constructor(options = {}) {
        this.port = process.env.PORT || options.port || 64892;
        this.host = options.host || '127.0.0.1';
        this.actions = new Actions(this);

        this.socket = new WebSocketServer.Server({port: this.port, host: this.host});

        this.init();
    }

    init() {

        this.socket.on('connection', (ws) => {

            this.actions.client = ws;

            this.actions.client.on('message', (message) => {
                this.actions.onMessage(JSON.parse(message));
            });

            this.actions.client.on('close', () => {
                this.actions.client = null
            });
        });
    }

}

module.exports = WsServer;