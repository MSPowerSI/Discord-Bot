const ticket = require('../utils/ticket')

module.exports = async (client) => {
    console.log("Bot iniciado com sucesso!");
    client.user.setActivity(`TV IMPACTA`, {
        type: "WATCHING"
    })

    ticket.sendMessage(client);
}