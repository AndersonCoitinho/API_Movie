const knex = require("../database/knex");
const { hash } = require("bcryptjs")

class UserRepository {
    async findByEmail(email) {
      const user = await knex("users").where({ email }).first()
      return user;
    }

    async create({name, email, password, avatar}) {
      const hashedPassword = await hash(password, 8);
      await knex('users').insert({
        name,
        email,
        password: hashedPassword,
        avatar
    })
    }

}


module.exports = UserRepository;