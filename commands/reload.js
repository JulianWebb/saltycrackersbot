// reload

exports.run = (client, message, args) => {
    for (event of client.eventNames()) {
        client.removeAllListeners(event);
    }
    client.load(client)
}

exports.config = {
    name: 'reload',
    aliases : [ 'load' ],
    description: "Hot Reload Command"
}