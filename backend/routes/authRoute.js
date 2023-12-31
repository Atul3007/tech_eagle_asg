const express = require("express");
const {
  registerController,
  loginController
} = require("../controller/registerController");
const { requireSignin, checkRole } = require("../middlewares/atuhMiddleware");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController); 

//protected user route
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected user route
router.get("/admin-auth", requireSignin, checkRole, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = {
  router,
};
