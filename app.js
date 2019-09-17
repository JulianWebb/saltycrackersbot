// app.js


require('dotenv').config();

const Database = require('./libs/database');

const Discord = require('discord.js');
const client = new Discord.Client();
client.setMaxListeners(100); // Needed for modules not to hit limit

client.log = (str) => {
    let date = new Date();
    let hour = date.getUTCHours().toString();
    let minute = date.getUTCMinutes().toString();

    console.log(`[INFO] ${hour.length < 2? `0${hour}`: hour }:${minute.length < 2? `0${minute}`: minute } ${str}`)
}

client.error = (str) => {
    let date = new Date();
    let hour = date.getUTCHours().toString();
    let minute = date.getUTCMinutes().toString();

    console.error(`[ERROR] ${hour.length < 2? `0${hour}`: hour }:${minute.length < 2? `0${minute}`: minute } ${str}`)
}

client.config = require('./config.json');
client.db = new Database(client.config.database, client.config.dbVerbose ? client.log : null);

client.load = require('./libs/load');

const init = async () => {
    client.load(client);

    client.log('Starting bot');
    client.login(process.env.TOKEN);
}

init();