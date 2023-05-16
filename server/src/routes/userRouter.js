const Router = require("express");
const { signUp, signIn, check } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddlewares");

const router = new Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/auth", authMiddleware, check);

module.exports = router;
