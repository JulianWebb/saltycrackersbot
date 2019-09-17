// gatekeeper

exports.name = "gatekeeper";

exports.guildMemberAdd = (client, member) => {
    let date = new Date();

    client.db.userJoined({
        id:member.user.id,
        tag: member.user.tag,
        joined: date.toISOString()
    })
}

exports.guildMemberRemove = (client, member) => {
    client.log(`Updating ${member.user.tag} in database`);
    client.db.userLeftServer(member.user.id);
}

exports.message = (client, message) => {
    let userID = message.author.id;
    let msgTime = message.createdAt;
    let msgChan = message.channel.id;

    if (client.db.userExists(userID)) {
        client.log(`${message.channel.guild.name.replace(' ', '_')} ${message.author.tag} in database already`)
        let lastTime = new Date(client.db.getLastMessage(userID));
        let timeSince = (msgTime - lastTime) / 1000;
        if (timeSince >= client.config.gatekeeper.requirements.msgFrequencyThreshold) {
            client.log(`${message.channel.guild.name.replace(' ', '_')} ${message.author.tag} met frequency threshold`)
            if (!(msgChan in client.config.gatekeeper.channelBlacklist)) {
                client.log(`${message.channel.guild.name.replace(' ', '_')} ${message.channel.name.toUpperCase()} not in blacklist`)
                client.db.incrementMessageCount(userID);
                // TODO: add check to see if the user meets the requirements and if so display opportunity
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
}