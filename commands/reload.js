// reload

exports.run = (client, message, args) => {
    console.log('Reloading')

    // Needed to remove duplicates
    for (event of client.eventNames()) {
        console.log('Removing listeners for ' + event);
        client.removeAllListeners(event);
    }

    // Needed to clean up any references to dropped files
    delete client.commands;
    delete client.aliases;

    client.load(client)
}

exports.config = {
    name: 'reload',
    aliases : [ 'load' ],
    description: "Hot Reload Command"
}