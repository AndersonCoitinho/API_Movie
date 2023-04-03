const { Router } = require("express");

const routes = Router();

const usersRoutes = require("./User.Routes");

routes.use("/users", usersRoutes)


module.exports = routes;