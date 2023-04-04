const knex = require("../database/knex");

class TagsController {
    async create(req, res) {
            const { name } = req.body
            const { user_id, note_id } = req.params;

            await knex('movie_tags').insert({
                name,
                user_id,
                note_id
            })

            return res.status(201).send()
    }

}
module.exports = TagsController;