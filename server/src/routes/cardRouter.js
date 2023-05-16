const Router = require("express");
const { create, getAll } = require("../controllers/cardController");

const router = new Router();

router.get("/", getAll);
router.post("/", create);

module.exports = router;
