const express = require("express");
const router = express.Router();
const {
  findOneuser,
  findUsers,
  deleteUser,
  editUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware"); //protect route middleware(check token)

router.get("/", protect, findUsers);
router.get("/finduser/:id", protect, findOneuser);
router.delete("/deleteuser/:id", protect, deleteUser);
router.put("/edituser/:id", protect, editUser);

module.exports = router;
