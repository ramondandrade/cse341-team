const router = require("express").Router();
const userController = require("../controllers/userController");
const validation = require("../middleware/userValidate");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.post("/", validation.saveUser, userController.createUser);
router.put("/:id", validation.saveUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
