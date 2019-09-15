// guildMemberRemove

exports.name = 'guildMemberRemove';

exports.func = (client, member) => {
    let date = new Date();
    let hour = date.getUTCHours().toLocaleString('en-CA', {minimumIntegerDigits: 2});
    let minute = date.getUTCMinutes().toLocaleString('en-CA', {minimumIntegerDigits: 2});
    console.log(`[${hour}:${minute}] ${member.guild.name.replace(' ', '_')} @${member.user.tag} left the guild`)
    
    console.log(`[${hour}:${minute}] Updating ${member.user.tag} in database`);
    client.db.userLeftServer(member.user.id);
}