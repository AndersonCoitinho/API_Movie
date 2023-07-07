const knex = require("../database/knex");
const AppError = require("../utils/AppError")

class NotesController {
    async create(req, res) {
        const { title, description, rating } = req.body
        const user_id = req.user.id;

        if (rating < 0 || rating > 5) {
            throw new AppError("A nota precisar ser entre zero e cinco.");
        }

        await knex('movie_notes').insert({
            title,
            description,
            rating,
            user_id
        })

        return res.status(201).send()
    }

    async show(request, response) {
        const { id } = request.params

        const note = await knex("movie_notes").where({ id }).first();

        return response.json(note)
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movie_notes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { title, user_id } = request.query;

        const notes = await knex("movie_notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");

        return response.json(notes)

    }

}

module.exports = NotesController;
