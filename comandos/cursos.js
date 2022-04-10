const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('6d6ee8')
    .setTitle('Cursos')
    .setThumbnail(`${client.user.avatarURL({ format: 'png' })}`)
    .setDescription('https://www.impacta.com.br')
    .setTimestamp();

    return message.reply({ embeds: [embed]})
}

module.exports.help = {
    name: "contato",
    roles: [],
    log: false
};