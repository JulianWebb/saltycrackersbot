// app.js
require('dotenv').config();

const Database = require('./libs/database');

const Discord = require('discord.js');
const client = new Discord.Client();
client.setMaxListeners(100); // Needed for modules not to hit limit

client.config = require('./config.json');
Object.assign(client, require('./libs/logger'));

client.db = new Database(client.config.database, client.config.dbVerbose ? client.log : null);

client.load = require('./libs/load');



const init = async () => {
    client.load(client);

    client.log('Starting bot');
    client.login(process.env.TOKEN);
}

init();