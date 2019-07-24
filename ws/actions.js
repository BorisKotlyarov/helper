class Actions {

    constructor(parent) {
        this.parent = parent;
        this.client = null;
    }

    onMessage(incoming) {
        if (this[incoming.action]) {
            this[incoming.action](incoming);
        }
    }

    send(action, data) {
        if (this.client !== null) {
            this.client.send(JSON.stringify({action, ...data}))
        }
    }

    ping(incoming) {
        this.send('pong', {time: new Date().getTime()});
    }

    setSettings(incoming){
        console.log(incoming)
    }

}

module.exports = Actions;