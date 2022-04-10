module.exports.run = (client, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    const reason = args.slice(1).join(' ')

    if (!user) {
        return message.reply('Marque o usuário que deseja banir.')
    }

    if (!reason) {
        return message.reply('Informe o motivo após o usuário')
    }

    message.guild.members.ban(user, { reason: reason})
        .then((usuario) => message.channel.send(`${usuario.user?.tag ?? usuario?.tag ?? user.username} foi banido pelo motivo: ${reason}\nBanimento aplicado por: ${message.author}`))
        .catch(() => message.reply(`Erro inesperado.`));

    message.delete();
}

module.exports.help = {
    name: "banir",
    roles: ['960205837094232114'],
    log: true
};