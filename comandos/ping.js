module.exports.run = (client, message, args) => {
    return message.reply("Pong! \nTempo de resposta: "+ Math.round(client.ws.ping)+ "ms");
}

module.exports.help = {
    name: "ping",
    roles: [],
    log: false
};