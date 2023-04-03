const knex = require("../database/knex");
const { hash } = require("bcryptjs")

class UserController {
    async create(req, res) {
            const { name, email, password, avatar } = req.body

            const hashedPassword = await hash(password,8); /*criptrografando senha*/

            const checkUserExists = await email = email;

            await knex('users').insert({
                name,
                email,
                password: hashedPassword,
                avatar
            })
            return res.status(201).send()

            
    }
}
module.exports = UserController;
