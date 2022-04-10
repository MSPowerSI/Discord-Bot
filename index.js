// Importação dos módulos
require('dotenv').config()
const Discord = require('discord.js')
const fs = require("fs")
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"]
});

if (!process.env.PREFIX) {
    console.error('Você não definiu a variavel de ambiente do prefixo!')
    process.exit();
}

// Command Handler
client.commands = new Discord.Collection();
fs.readdir("./comandos/", (err, files) => {
    if (err) return console.error('Pasta de comandos não foi carregada');

    let arquivosjs = files.filter(f => f.split(".").pop() == "js");
    arquivosjs.forEach((f, i) => {
        let command = require(`./comandos/${f}`);
        let commandName = f.slice(0, -3);

        if (command?.help?.name) {
            client.commands.set(command.help.name, command);
            console.log(`Comando ${commandName} carregado`);
        } else {
            console.log(`Comando ${commandName} não foi carregado corretamente`);
        }
    });
});

// Event Handler
fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error('Pasta de eventos não foi carregada');

    let arquivosjs = files.filter(f => f.split(".").pop() == "js");
    arquivosjs.forEach((f, i) => {
        let event = require(`./eventos/${f}`);
        let eventName = f.slice(0, -3)

        try {
            client.on(eventName, event.bind(null, client))
            console.log(`Evento ${eventName} carregado`)
        } catch (error) {
            console.error(`Não foi possível carregar o evento ${eventName}`)
        }
    });
});

client.login(process.env.DISCORD_TOKEN)