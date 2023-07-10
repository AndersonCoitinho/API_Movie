const knex = require("../database/knex");

class TagsController {
    async index(request, response) {
        const user_id = request.user.id;

        const tags = await knex("movie_tags")
            .where({ user_id })
            .groupBy("name")

        return response.json(tags);
    }
    /*async create(req, res) {
            const { name } = req.body
            const user_id = request.user.id;

            await knex('movie_tags').insert({
                name,
                user_id,
            })

            return res.status(201).send()
    }*/

}
module.exports = TagsController;