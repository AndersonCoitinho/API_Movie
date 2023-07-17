const AppError = require("../utils/AppError")
const knex = require("../database/knex");

const { hash, compare } = require("bcryptjs")

const UserRepository = require("../repositories/UserRepository")

class UserController {
    async create(req, res) {
        const { name, email, password, avatar } = req.body

        const userRepository = new UserRepository();

        const hashedPassword = await hash(password, 8); /*criptrografando senha*/

        const checkUserExists = await knex("users").where({ email }).first()
        if (checkUserExists) {
            throw new AppError("Este e-mail já esta em uso.");
        };


        await knex('users').insert({
            name,
            email,
            password: hashedPassword,
            avatar
        })
        return res.status(201).send()


    }
    /* ----- REVISAR ----- */
    async update(request, response) {
       
        const { name, email, password, new_password } = request.body
        const user_id = request.user.id

        const userExists = await knex('users').where({ email })
        
        if (userExists.length === 1 && userExists[0].id !== user_id) {
            throw new AppError('Email já cadastrado!')
        }

        if (password && new_password) {
            const validUserPassword = await knex
            .select('password')
            .from('users')
            .where('id', user_id)

            const checkOldPassword = await compare(password, validUserPassword[0].password)
            
            const att_password = await hash(new_password, 8)
            
            if (!checkOldPassword) {
                throw new AppError('A senha antiga não confere.')
            }

            await knex('users').where('id', user_id).update({ password: att_password })
        }

        await knex('users').where('id', user_id).update({
        name,
        email
        })

        return response.json()
    }


}

module.exports = UserController;
