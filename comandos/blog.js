const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('6d6ee8')
    .setTitle('Blog')
    .setThumbnail(`${client.user.avatarURL({ format: 'png' })}`)
    .setDescription('https://www.impacta.com.br/blog')
    .setTimestamp();

    return message.reply({ embeds: [embed]})
}

module.exports.help = {
    name: "blog",
    roles: [],
    log: false
};