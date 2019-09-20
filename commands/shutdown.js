// shutdown

exports.run = (client, message, args) => {
    process.exit(1);
}

exports.config = {
    name: "shutdown",
    aliases: ["exit"],
    description: "Shuts down the bot",
    permission: "administrator"
}