async function getMessagesFromChannel(channel) {
    if (!channel) {
        return null;
    }

    let list = [];
    let lastId = null;
    let options = {};
    let remaining = 10000;

    while (remaining > 0) {
        options.limit = remaining > 100 ? 100 : remaining;
        remaining = remaining > 100 ? remaining - 100 : 0;

        if (lastId) {
            options.before = lastId;
        }

        let messages = await channel.messages.fetch(options);

        if (!messages.last()) {
            break;
        }

        list = list.concat(messages);
        lastId = messages.last().id;
    }
    list.remaining = remaining;

    return list;
}

async function clearChannel(channel) {
    const listMessages = await getMessagesFromChannel(channel);

    let i = 1;

    listMessages.forEach(messages => {
        messages.forEach(msg => {
            i++;
            if (i < 10000) {
                setTimeout(function () {
                    msg.delete()
                }, 1000 * i)
            }
        })
    })

}

module.exports = {
    clearChannel, getMessagesFromChannel
}