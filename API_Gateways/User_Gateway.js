//Gateway for User routes
const express = require('express')
const router = express.Router()
const asyncHandler = require("../Helpers/asyncHandler")
const validate = require('validate.js')

//API ACCESS MODIFIERS
const admin_access = require('../middleware/admin_access')
const block_curator = require('../middleware/block_curator')
const block_student = require('../middleware/block_student')


/*
    Databases
*/

const db = require('../models')

//Service
const User = require('../Services/Users/User_Service')
const User_DB = require('../Services/Users/User_DB')
const User_Db_Handler = User_DB(db)


//route to create a user
/*

@body
-first_name: string
-last_name: string
-username: string
-password: string
-email: string
-permission_id: int
*/

router.post('/', admin_access, asyncHandler(async (req, res) => {
    console.log(req.body)

    const constraints = {
        first_name: {
            presence: true,
            length: { maximum: 50 }
        },
        last_name: {
            presence: true,
            length: { maximum: 50 }
        },
        username: {
            presence: true,
            length: { minimum: 8, maximum: 20 }
        },
        password: {
            presence: true,
            length: { minimum: 8, maximum: 20 }
        },
        email: {
            presence: true,
            email: true
        },
    }
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const permission_id = req.body.permission_id

    const validation = validate({ first_name, last_name, username, password, email }, constraints)
    if (validation) return res.status(400).json({ error: validation })

    //forward user service
    const ValidateUserExists = User.ValidateUserExistsFactory(User_Db_Handler)
    const found_user = await ValidateUserExists(username, email)
    if (found_user) {
        if (username === found_user.username) return res.status(400).json({ error: `Username ${username} is already taken` })
        if (email === found_user.email) return res.status(400).json({ error: `Email ${email} is already taken` })
    }

    const CreateNewUser = User.CreateUserFactory(User_Db_Handler)
    const new_user = await CreateNewUser({ first_name, last_name, email, username, password, permission_id })

    return res.status(200).json({ user: new_user })
}))

module.exports = router