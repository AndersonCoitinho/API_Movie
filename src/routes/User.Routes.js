const { Router } = require("express");
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UserController = require("../controllers/UserControllers")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const userAvatarController = require("../controllers/UserAvatarController")

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const userController = new UserController();

usersRoutes.post("/", userController.create)
usersRoutes.put("/", ensureAuthenticated, userController.update);



module.exports = usersRoutes;