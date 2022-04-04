const Discord = require('discord.js')

// Instanciar o ticket 
function sendMessage(ticketChannel) {
    const embed = new Discord.MessageEmbed()
        .setColor('6d6ee8')
        .setDescription('Clique para abrir um novo ticket')
    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('open-ticket')
            .setLabel('Abrir ticket')
            .setEmoji('✉️')
            .setStyle('PRIMARY')
        );

    ticketChannel.send({
        embeds: [embed],
        components: [row]
    })
}

module.exports = { sendMessage }