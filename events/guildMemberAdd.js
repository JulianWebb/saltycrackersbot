// join

exports.name = 'guildMemberAdd';

exports.func = (client, member) => {
    client.log(`${member.guild.name.replace(' ', '_')} @${member.user.tag} joined the guild`)
}