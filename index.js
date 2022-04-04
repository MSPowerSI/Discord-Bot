// Importação dos módulos
require('dotenv').config()
const Discord = require('discord.js')
const fs = require("fs")
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"]
});

// Command Handler
client.commands = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {
    if (err) return console.error('Pasta de comandos não encontrada');

    let arquivosjs = files.filter(f => f.split(".").pop() == "js");
    arquivosjs.forEach((f, i) => {
        let command = require(`./comandos/${f}`);
        let commandName = f.slice(0, -3);

        client.commands.set(command?.help?.name ?? commandName, command);
        console.log(`Comando ${commandName} carregado`);
    });
    console.log(`${arquivosjs.length} comandos carregados com sucesso!`)
});

// Event Handler
fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error('Pasta de eventos não encontrada');

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
    console.log(`${arquivosjs.length} eventos carregados com sucesso!`)
});

client.login(process.env.DISCORD_TOKEN)