// load
const fs = require('fs');

module.exports = (client) => {
    client.commands = {};
    client.aliases = {};


    //Load Modules
    fs.readdir('./modules/', (err, files) => {
        if (err) return console.error(err);

        files.forEach( file => {
            if (!file.endsWith('.js')) return;

            let mod = require(`../modules/${file}`);
            let name = mod.name;
            console.log(`Loading Module: ${name}`);

            for (event in mod) {
                if (typeof mod[event] == 'function') {
                    client.on(event, mod[event].bind(null, client))
                }
            }

            delete require.cache[require.resolve(`../modules/${file}`)];
        })
    })

    //Load Commands
    fs.readdir('./commands/', (err, files) => {
        if (err) return console.error(err);

        files.forEach( file => {
            if (!file.endsWith('.js')) return;

            let cmd = require(`../commands/${file}`);
            let name = cmd.config.name.toLowerCase();
            console.log(`Loading Command: ${name}`);

            if (cmd.init) {
                console.log(`Initalizing Command: ${name}`);
                cmd.init(client);
            }

            client.commands[name] = {
                run: cmd.run,
                conf: cmd.conf
            };

            cmd.config.aliases.forEach(alias => {
                client.aliases[alias] = client.commands[name];
            })

            delete require.cache[require.resolve(`../commands/${file}`)];
        })
    })

    //Loading Events
    fs.readdir('./events/', (err, files) => {
        if (err) return console.error(err);
    
        files.forEach( file => {
            if (!file.endsWith('.js')) return;
    
            let event = require(`../events/${file}`);
    
            try {
                client.on(event.name, event.func.bind(null, client));
                console.log(`Loading Event ${event.name}`);
            } catch (e) {
                console.log(`Failed to load Event: ${event.name}`);
                console.error(e);
            }

            delete require.cache[require.resolve(`../events/${file}`)];
        })
    })
}
