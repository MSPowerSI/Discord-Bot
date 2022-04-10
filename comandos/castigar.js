module.exports.run = (client, message, args) => {
    const user = message.mentions.users.first()
    const tempo = args[1]
    const reason = args.slice(2).join(' ')

    if (!user) {
        return message.reply('Marque o usuário que deseja expulsar.')
    }

    if (!tempo) {
        return message.reply('Você precisa definir o tempo em minutos')
    }

    if (tempo < 1 || isNaN(tempo)) {
        return message.reply('Você precisa definir um tempo valido contendo apenas números')
    }

    if (!reason) {
        return message.reply('Informe o motivo após o tempo')
    }

    const guildMember = message.guild.members.cache.get(user.id);
    guildMember.timeout((60 * 1000) * tempo, reason)
        .then(() => message.reply(`${user.username} foi castigado por ${tempo} ${tempo == 1 ? 'minuto' : 'minutos'} pelo motivo: ${reason}\n Por: ${message.author}`))
        .catch(() => message.reply(`Erro inesperado.`));
}

module.exports.help = {
    name: "castigar",
    roles: ['960205837094232114'],
    log: true
};