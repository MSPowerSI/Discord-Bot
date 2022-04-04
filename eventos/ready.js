const ticket = require('../utils/ticket')
const message = require('../utils/message')

module.exports = async (client) => {
    console.log("Bot iniciado com sucesso!");
    client.user.setActivity(`TV IMPACTA`, {
        type: "WATCHING"
    })

    const ticketChannel = client.channels.cache.get('960355208683225129')
    message.clearChannel(ticketChannel)

    ticket.sendMessage(ticketChannel);
}