// ping

exports.run = (client, message, args) => {
    message.reply('Hello There')
}

exports.config = {
    name: 'ping',
    aliases : [ 'pong' ],
    description: "Simple reply command",
    permission: 'everyone'
}