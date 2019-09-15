// message

exports.name = "message"

exports.func = (client, message) => {
    let hour = message.createdAt.getUTCHours().toLocaleString('en-UK', {minimumIntegerDigits: 2});
    let minute = message.createdAt.getUTCMinutes().toLocaleString('en-UK', {minimumIntegerDigits: 2});
    console.log(`[${hour}:${minute}] ${message.channel.guild.name.replace(' ', '_')}:#${message.channel.name.toUpperCase()} @${message.author.tag}: ${message.content}`)
    
    // Gatekeeper
    let userID = message.author.id;
    let msgTime = message.createdAt;
    let msgChan = message.channel.id;

    if (client.db.userExists(userID)) {
        console.log(`[${hour}:${minute}] ${message.channel.guild.name.replace(' ', '_')} ${message.author.tag} in database already`)
        let lastTime = new Date(client.db.getLastMessage(userID));
        let timeSince = (msgTime - lastTime) / 1000;
        if (timeSince >= client.config.gatekeeper.requirements.msgFrequencyThreshold) {
            console.log(`[${hour}:${minute}] ${message.channel.guild.name.replace(' ', '_')} ${message.author.tag} met frequency threshold`)
            if (!(msgChan in client.config.gatekeeper.channelBlacklist)) {
                console.log(`[${hour}:${minute}] ${message.channel.guild.name.replace(' ', '_')} ${message.channel.name.toUpperCase()} not in blacklist`)
                client.db.incrementMessageCount(userID);
                // TODO: add check to see if the user meets the requirements
            }
        }
    } else {
        // This is to catch the users that already were on the server before the bot
        client.db.addUser({
            id: userID,
            tag: message.author.tag,
            joined: message.member.joinedAt.toISOString()

        })

        client.db.canPolitick(userID);
    }

    client.db.updateLastMessage(userID, msgTime.toISOString());


    
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