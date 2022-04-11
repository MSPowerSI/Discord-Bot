module.exports.run = (client, message, args) => {
    if (!args[0]) return message.reply("Você precisa informar o texto a ser anunciado após o comando.")
    
    message.delete();

    let messageSend = args.join(' ')
    return message.channel.send(messageSend);
}

module.exports.help = {
    name: "anunciar",
    roles: ['960205837094232114'],
    log: true
};