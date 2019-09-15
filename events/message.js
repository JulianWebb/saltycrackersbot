// message

exports.name = "message"

exports.func = (client, message) => {
    
    let hour = message.createdAt.getUTCHours().toLocaleString('en-UK', {minimumIntegerDigits: 2});
    let minute = message.createdAt.getUTCMinutes().toLocaleString('en-UK', {minimumIntegerDigits: 2});
    console.log(`[${hour}:${minute}] ${message.channel.guild.name.replace(' ', '_')}:#${message.channel.name.toUpperCase()} @${message.author.tag}: ${message.content}`)
    /*client.db.addUser({
        id: message.author.id,
        tag: message.author.tag,
        joined: message.createdAt.toISOString()
    });*/
    
    // Command Handling
    // TODO: Add in perm level checking
    if (message.author.bot || message.author.id == client.user.id) return;

    if (message.content.indexOf(client.config.prefix) == 0) {
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if (command in client.commands) {
            client.commands[command].run(client, message, args);
        } else if (command in client.aliases) {
            client.aliases[command].run(client, message, args);
        }
    }
}