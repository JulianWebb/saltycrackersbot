// join

exports.name = 'guildMemberAdd';

exports.func = (client, member) => {
    let date = new Date();
    let hour = date.getUTCHours().toLocaleString('en-CA', {minimumIntegerDigits: 2});
    let minute = date.getUTCMinutes().toLocaleString('en-CA', {minimumIntegerDigits: 2});
    console.log(`[${hour}:${minute}] ${member.guild.name.replace(' ', '_')} @${member.user.tag} joined the guild`)
    
    client.db.userJoined({
        id:member.user.id,
        tag: member.user.tag,
        joined: date.toISOString()
    })


}