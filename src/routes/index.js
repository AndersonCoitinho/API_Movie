const { Router } = require("express");

const routes = Router();

const usersRoutes = require("./User.Routes");
const notesRoutes = require("./Notes.Routes");
const tagsRoutes = require("./Tags.Routes");

routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)


module.exports = routes;