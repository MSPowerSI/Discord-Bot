const Discord = require('discord.js')
const utils = require('../utils/date')

module.exports = async (client, membro) => { 
    const embedAdd = new Discord.MessageEmbed()
    .setTitle('Um novo membro apareceu!')
    .setDescription(`Seja bem vindo a Impacta, ${membro}`)
    .setThumbnail(`${membro.user.displayAvatarURL({ dynamic: true })}?size=1024`)
    .addField('**Conta criada no Discord em**', utils.formatDate('DD/MM/YYYY, às HH:mm:ss', membro.user.createdAt), true)
    .setTimestamp()
    
    membro.guild.channels.cache.get('960318746143109121').send({ embeds: [embedAdd] });
}