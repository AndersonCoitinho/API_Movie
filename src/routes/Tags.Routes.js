const { Router } = require("express")

const TagsController = require("../controllers/TagsControllers")

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.post("/:user_id/:note_id", tagsController.create);

module.exports = tagsRoutes; /*exportando*/