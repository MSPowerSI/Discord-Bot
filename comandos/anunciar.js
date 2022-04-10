module.exports.run = (client, message, args) => {
    message.delete();

    let messageSend = args.join(' ')
    return message.channel.send(messageSend);
}

module.exports.help = {
    name: "anunciar",
    roles: ['960205837094232114'],
    log: true
};