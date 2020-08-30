const { expect } = require('chai')
const { UsernameExists } = require('../../Services/Users/User_DB')
const db = require('../../models')

describe('User DB Test Suite', () => {
    it('should see if a username already exists in db', async () => {
        const check = await UsernameExists('')
        expect(check).to.be.false
        expect(check === undefined).to.be.false
        expect(check === null).to.be.false
    })

    it('should throw an error because no username was passed', async () => {
        try {
            const check = await UsernameExists()
        } catch (e) {
            expect(e).to.be.an('Error')
            expect(e.message).to.equal('No username was passed as an argument')
        }
    })

    it('should create a user, see if username already exists, and fail', async () => {
        const test = await db.user.create({
            first_name: 'test',
            last_name: 'test',
            username: 'test_test',
            password: 'test_test',
            email: 'test@test.com',
            permission_id: 1
        })

        const check = await UsernameExists('test_test')
        expect(check).to.be.an('object')

        await test.destroy({ force: true })
    })
})