// ready

exports.name = "ready";

exports.func = (client) => {
    client.log(`Connected as ${client.user.tag}`)
}