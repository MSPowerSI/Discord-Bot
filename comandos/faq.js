const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('6d6ee8')
    .setTitle('Perguntas frequentes - FAQ')
    .setDescription('A Faculdade Impacta Tecnologia é uma instituição brasileira de ensino superior com foco em tecnologia da informação e gestão empresarial.')
    .addField('Onde é localizado o campus?', 'No bairro da Barra Funda, na cidade de São Paulo.')
    .addField('Quais modalidades disponíveis?', 'EAD e Presencial *(Consultar a grade do curso)')
    .addField('Qual a visão da Impacta?', 'Ser o melhor em educação, conhecimento, capacitação e inovação com liderança, presença e referência mundial.')
    .setTimestamp();

    return message.reply({ embeds: [embed]})
}

module.exports.help = {
    name: "faq",
    roles: [],
    log: false
};