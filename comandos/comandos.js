const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('6d6ee8')
    .setTitle('Comandos')
    .setThumbnail(`${client.user.avatarURL({ format: 'png' })}?size=1024`)
    .setDescription('Aqui estão meus comandos:')
    .addField(`${process.env.PREFIX}cursos`, 'Lista de cursos')
    .addField(`${process.env.PREFIX}faq`, 'Perguntas frequentes')
    .setTimestamp();

    return message.reply({ embeds: [embed]})
}

module.exports.help = {
    name: "comandos",
    roles: [],
    log: false
};