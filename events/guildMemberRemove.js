// guildMemberRemove

exports.name = 'guildMemberRemove';

exports.func = (client, member) => {
    client.log(`${member.guild.name.replace(' ', '_')} @${member.user.tag} left the guild`)    
}