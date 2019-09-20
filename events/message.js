// message

exports.name = "message"

exports.func = (client, message) => {
    client.log(`${message.channel.guild.name.replace(' ', '_')}:#${message.channel.name.toUpperCase()} @${message.author.tag}: ${message.content}`)
    // Command Handling
    // TODO: Add in perm level checking
    if (message.author.bot || message.author.id == client.user.id) return;

    if (message.content.indexOf(client.config.prefix) == 0) {
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        let cmd = client.commands[command] || client.aliases[command];

        if (cmd) {
            let userRoles = message.member.roles;
            if (client.perms.check(userRoles, cmd.config.permission)) {
                client.log(`User ${message.author.tag} ran command: ${cmd.config.name}`)
                cmd.run(client, message, args);
            } else {
                client.log(`User ${message.author.tag} attempted command: ${cmd.config.name}`)
            }
        }
    }
}