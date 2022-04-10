const permission = require('../utils/permission')

module.exports = async (client, message) => {
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    // Tratativas para ignorar mensagens de bot e mensagens no privado
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    let prefix = process.env.PREFIX;
    if (message.content[0] != prefix || message.content.length == 1) return;

    let arquivocmd = client.commands.get(command.slice(prefix.length));
    let arquivoHelp = arquivocmd?.help ?? null;

    if (arquivoHelp?.roles != null && (arquivoHelp?.roles).length > 0 ? await permission.checkPermission(arquivocmd.help.roles, message.guild, message.author) : true) {
        if (arquivoHelp?.log) console.log(`${message.author.tag} executou o comando ${arquivoHelp?.name} no canal ${message.channel.name}`)
        if (arquivocmd) arquivocmd.run(client, message, args)
        else message.reply('Este comando não existe!');
    } else {
        message.reply('Você não tem permissão para executar este comando!').then(msg => {
            setTimeout(() => {
                msg.delete().catch(err => {
                    return
                }), message.delete().catch(err => {
                    return
                })
            }, 5000)
        })
    }
}