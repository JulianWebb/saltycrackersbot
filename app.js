// app.js
const fs = require('fs');

require('dotenv').config();

const Database = require('./libs/database');

const Discord = require('discord.js');
const client = new Discord.Client();

client.config = require('./config.json');
client.db = new Database(client.config.database, client.config.dbVerbose ? console.log : null);

client.commands = {};
client.aliases = {};

const init = async () => {
    //Command Loading
    fs.readdir('./commands/', (err, files) => {
        if (err) return console.error(err);

        files.forEach( file => {
            if (!file.endsWith('.js')) return;

            let cmd = require(`./commands/${file}`);
            let cmdName = cmd.config.name.toLowerCase();
            console.log(`Loading Command: ${cmdName}`);

            if (cmd.init) {
                console.log(`Initializing Command: ${cmdName}`);
                cmd.init(client);
            };

            client.commands[cmdName] = {
                run: cmd.run,
                conf: cmd.conf
            };

            cmd.config.aliases.forEach(alias => {
                client.aliases[alias] = client.commands[cmdName];
            });
        });
    });

    //Event Loading
    fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);

        files.forEach( file => {
            if (!file.endsWith('.js')) return;

            let event = require(`./events/${file}`);

            try {
                client.on(event.name, event.func.bind(null, client));
                console.log(`Loading Event ${event.name}`);
            } catch (e) {
                console.log(`Failed to load Event: ${event.name}`);
                console.error(e);
            }
        })
    })

    console.log('Starting bot');
    client.login(process.env.TOKEN);
}

init();