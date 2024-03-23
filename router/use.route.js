const express = require("express");
const controllers = require("../controller/user.controller");
const router = express.Router(controllers.getUser);
const {
  authenticateUser,
  createUserValidation,
  updateUser,
} = require("../middleware/authentications");

//?Routing the request to corresponding controller
router.get("/", controllers.readAllUser);
router.get("/:id", authenticateUser, controllers.readAnUser);
router.post("/new", createUserValidation, controllers.createUser);
router.post(
  "/:id/update",
  authenticateUser,
  updateUser,
  controllers.updateUser
);
router.post("/:id/reward/update", authenticateUser, controllers.updateReward);
router.delete("/:id/reward/revert", controllers.rewardRevert);

module.exports = router;
