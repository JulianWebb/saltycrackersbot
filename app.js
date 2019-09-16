// app.js


require('dotenv').config();

const Database = require('./libs/database');

const Discord = require('discord.js');
const client = new Discord.Client();
client.setMaxListeners(100); //Needed for modules not to hit limit

client.config = require('./config.json');
client.db = new Database(client.config.database, client.config.dbVerbose ? console.log : null);

client.load = require('./libs/load');

const init = async () => {
    client.load(client);

    console.log('Starting bot');
    client.login(process.env.TOKEN);
}

init();