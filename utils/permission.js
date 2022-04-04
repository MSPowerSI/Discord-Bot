// Função para verificar permissão passando o array das roles, servidor e user
async function checkPermission(roles, guild, userId) {
    let member = await guild.members.fetch({
        user: userId,
        limit: 1
    })
    let userRoles = member?._roles ?? [];

    for (let index = 0; index < userRoles.length; index++) {
        if (roles.includes(userRoles[index])) return true;
    }
    return false;
}

module.exports = { checkPermission }