const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('6d6ee8')
    .setTitle('Comandos')
    .setThumbnail(`${client.user.avatarURL({ format: 'png' })}?size=1024`)
    .setDescription('Aqui estão meus comandos:')
    .addField(`${process.env.PREFIX}faq`, 'Perguntas frequentes')
    .addField(`${process.env.PREFIX}blog`, 'Blog da Impacta')
    .addField(`${process.env.PREFIX}cursos`, 'Cursos da Impacta')
    .addField(`${process.env.PREFIX}contato`, 'Contato da Impacta')
    .addField(`${process.env.PREFIX}graduacao`, 'Graduações da Impacta')
    .addField(`${process.env.PREFIX}tecnicos`, 'Técnicos da Impacta')
    .setTimestamp();

    return message.reply({ embeds: [embed]})
}

module.exports.help = {
    name: "comandos",
    roles: [],
    log: false
};