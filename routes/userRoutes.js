const router = require("express").Router();
const usersController = require("../controllers/userControllers");
const validation = require("../middleware/userValidate");

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getSingleUser);
router.post("/", validation.saveUser, usersController.createUser);
router.put("/:id", validation.saveUser, usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
