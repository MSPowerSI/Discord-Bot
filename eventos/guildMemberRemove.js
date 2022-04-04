const Discord = require('discord.js')
const utils = require('../utils/date')

module.exports = async (client, membro) => {
    const embedRemove = new Discord.MessageEmbed()
    .setTitle('Um membro saiu!')
    .setDescription(`${membro} deixou o servidor!`)
    .setThumbnail(`${membro.user.displayAvatarURL({ dynamic: true })}?size=1024`)
    .addField('**Conta criada no Discord em**', utils.formatDate('DD/MM/YYYY, às HH:mm:ss', membro.user.createdAt), true)
    .setTimestamp()

    membro.guild.channels.cache.get('960323022739341312').send({ embeds: [embedRemove] });
}