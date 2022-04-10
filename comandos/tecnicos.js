const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('6d6ee8')
    .setTitle('Técnicos')
    .setThumbnail(`${client.user.avatarURL({ format: 'png' })}`)
    .setDescription('https://www.impacta.edu.br/tecnicos')
    .setTimestamp();

    return message.reply({ embeds: [embed]})
}

module.exports.help = {
    name: "tecnicos",
    roles: [],
    log: false
};