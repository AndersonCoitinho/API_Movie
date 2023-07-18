const knex = require("../database/knex");

class UserRepository {
    async findByEmail(email) {
      const user = await knex("users").where({ email }).first()

      return user;
    }

    async create({name, email, password, avatar}) {

      const userId = await knex('users').insert({
        name,
        email,
        password,
        avatar
    })

    return { id: userId }
    }

}


module.exports = UserRepository;