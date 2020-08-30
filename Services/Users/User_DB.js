const db = require('../../models')


/*
Function checks if username already exists in database.
Returns user if username already taken, false otherwise.
*/
async function UsernameExists(username) {
    if (username === null || username === undefined) throw new Error('No username was passed as an argument')
    const user = await db.user.findOne({
        where: { username }
    })

    if (user) return user

    return false
}

module.exports = {
    UsernameExists
}