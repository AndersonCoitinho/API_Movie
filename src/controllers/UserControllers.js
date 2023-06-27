const AppError = require("../utils/AppError")
const knex = require("../database/knex");

const { hash, compare } = require("bcryptjs")


class UserController {
    async create(req, res) {
        const { name, email, password, avatar } = req.body

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
    async update(req, res) {
        const { name, email, old_password, new_password } = req.body
        const user_id = request.user.id

        const userExists = await knex("users").where({ user_id }).first()
        if (!userExists) {
            throw new AppError("Usuario não encontrado!")
        }

        const emailExists = await knex("users").where({ email }).first()
        if (emailExists) {
            throw new AppError("Este email já esta em uso.")
        }

        if (!old_password && new_password) {
            throw new AppError("Favor informar a senha antiga para alterar sua senha.")
        }

        const validUserPassword = await knex
            .select("password")
            .from("users")
            .where({ user_id })

        if (old_password && new_password) {
            validUserPassword
        }

        const matchCurrentPasswordWithNewPassword =
            await compare(old_password, validUserPassword[0].password)

        if (!matchCurrentPasswordWithNewPassword) {
            throw new AppError("A senha antiga nao confere.")
        }

        const newHashedPassword = await hash(new_password, 8)

        await knex("users").where({ user_id }).update({
            password: newHashedPassword
        })

        await knex("users").where({ user_id }).update({
            name,
            email
        })

        await knex("users")
            .update({
                updated_at: knex.fn.now()
            })
            .where('id', user_id);

        return res.json()
    }


}

module.exports = UserController;
