module.exports.run = (client, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    const reason = args.slice(1).join(' ')

    if (!user) {
        return message.reply('Marque o usuário que deseja expulsar.')
    }

    if (!reason) {
        return message.reply('Informe o motivo após o usuário')
    }

    message.guild.members.kick(user, reason)
        .then((usuario) => message.channel.send(`${usuario.user?.tag ?? usuario?.tag ?? user.username} foi expulso pelo motivo: ${reason}\n Por: ${message.author}`))
        .catch(() => message.reply(`Erro inesperado.`));

    message.delete()
}

module.exports.help = {
    name: "kick",
    roles: ['960205837094232114'],
    log: true
};