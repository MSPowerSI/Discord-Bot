module.exports.run = async (client, message, args) => {
    if (!args[0]) {
        return message.reply("Você deve informar a quantidade de mensagens que deseja excluir.")
    }

    if (isNaN(args[0])) {
        return message.reply("Por favor, informe apenas números.")
    }

    if ((parseInt(args[0]) < 1) || (parseInt(args[0]) > 99)) {
        return message.reply("Você só pode apagar no minimo 1 mensagem e no máximo 99 mensagens de uma vez.")
    }

    await message.channel.bulkDelete(parseInt(args[0]) + 1)
        .catch(err => console.log(err))
    return message.channel.send(`Deletado ${args[0]} ${args[0] > 1 ? 'mensagens' : 'mensagem'} com sucesso!`).then(m =>
        setTimeout(() => {
            m.delete().catch(err => {
                return
            })
        }, 5000)
    )
}

module.exports.help = {
    name: "deletar",
    roles: ['960205837094232114'],
    log: true
};