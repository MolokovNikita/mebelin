const { Router } = require("express");
const AuthController = require("../controllers/authController.js");

const router = Router();

router.post("/sign-in", AuthController.signIn);
router.post("/sign-up", AuthController.signUp);
router.post("/logout", AuthController.logOut);
router.post("/refresh", AuthController.refresh);

module.exports = router;
